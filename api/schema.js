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
    name: String
  }

  type Price {
    currency: String
    amount: Int
    decimals: Float
  }

  type Item {
    title: String
    price: [Price]
    picture: String
    condition: String
    free_shipping: String
    sold_quantity: String
    place: String
    description: String
  }

  type Products {
    id: ID
    categories: [Category]
    author: [Author!]
    item: [Item]
  }

  type Query {
    products: [Products]
    productsId(id: ID!): Products
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

const resolvers = {
  Mutation: {
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
    products() {
      return productsModel.list();
    },
    productsId(_, { id }) {
      return productsModel.find({ id });
    },
  },
};

module.exports = { typeDefs, resolvers };
