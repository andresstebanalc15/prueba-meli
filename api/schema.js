const userModel = require("./models/userModel");
const productsModel = require("./models/productsModel");
const { gql } = require("apollo-server-express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const typeDefs = gql`
  type Author {
    name: String
    lastname: String
  }

  type Category {
    category: String
  }
  type Price {
    currency: String
    amount: Int
    decimals: Double
  }

  type Item {
    id: String
    title: String
    price: [Price]
  }

  input UserCredentials {
    email: String!
    password: String!
  }

  type Mutation {
    signup(input: UserCredentials!): String
    login(input: UserCredentials!): String
  }
`;

function checkIsUserLogged(context) {
  const { email, id } = context;
  // check if the user is logged
  if (!id) throw new Error("you must be logged in to perform this action");
  // find the user and check if it exists
  const user = userModel.find({ email });
  // if user doesnt exist, throw an error
  if (!user) throw new Error("user does not exist");
  return user;
}

function tryGetFavsFromUserLogged(context) {
  try {
    const { email } = checkIsUserLogged(context);
    const user = userModel.find({ email });
    return user.favs;
  } catch (e) {
    return [];
  }
}

const resolvers = {
  Mutation: {
    likeAnonymousPhoto: (_, { input }) => {
      // find the photo by id and throw an error if it doesn't exist
      const { id: productId } = input;
      const product = productsModel.find({ id: productId });
      if (!product) {
        throw new Error(`Couldn't find photo with id ${productId}`);
      }
      // put a like to the photo
      productsModel.addLike({ id: productId });
      // get the updated photos model
      const actualPhoto = productsModel.find({ id: productId });
      return actualPhoto;
    },
    likePhoto: (_, { input }, context) => {
      const { id: userId } = checkIsUserLogged(context);

      // find the photo by id and throw an error if it doesn't exist
      const { id: photoId } = input;
      const photo = productsModel.find({ id: photoId });
      if (!photo) {
        throw new Error(`Couldn't find photo with id ${photoId}`);
      }

      const hasFav = userModel.hasFav({ id: userId, photoId });

      if (hasFav) {
        productsModel.removeLike({ id: photoId });
        userModel.removeFav({ id: userId, photoId });
      } else {
        // put a like to the photo and add the like to the user database
        productsModel.addLike({ id: photoId });
        userModel.addFav({ id: userId, photoId });
      }

      // get favs from user before exiting
      const favs = tryGetFavsFromUserLogged(context);
      // get the updated photos model
      const actualPhoto = productsModel.find({ id: photoId, favs });

      return actualPhoto;
    },
    // Handle user signup
    async signup(_, { input }) {
      // add 1 second of delay in order to see loading stuff
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { email, password } = input;

      const user = await userModel.find({ email });

      if (user) {
        throw new Error("User already exists");
      }

      const newUser = await userModel.create({
        email,
        password,
      });

      // return json web token
      return jsonwebtoken.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      );
    },

    // Handles user login
    async login(_, { input }) {
      // add 1 second of delay in order to see loading stuff
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { email, password } = input;
      const user = await userModel.find({ email });

      if (!user) {
        throw new Error("No user with that email");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error("Incorrect password");
      }

      // return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
    },
  },
  Query: {
    favs(_, __, context) {
      const { email } = checkIsUserLogged(context);
      const { favs } = userModel.find({ email });
      return productsModel.list({ ids: favs, favs });
    },
    categories() {
      return productsModel.list();
    },
    photo(_, { id }, context) {
      const favs = tryGetFavsFromUserLogged(context);
      return productsModel.find({ id, favs });
    },
    photos(_, { categoryId }, context) {
      const favs = tryGetFavsFromUserLogged(context);
      return productsModel.list({ categoryId, favs });
    },
  },
};

module.exports = { typeDefs, resolvers };
