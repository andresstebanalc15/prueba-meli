const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const { expressjwt } = require("express-jwt");

process.env.JWT_SECRET = process.env.JWT_SECRET || "somereallylongsecretkey";

const PORT = process.env.PORT || 3500;
const app = express();
const { categories } = require("./db.json");

app.use(cors());

const auth = expressjwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  algorithms: ["RS256"],
});

require("./adapter");

const server = new ApolloServer({
  introspection: true,
  playground: true,

  context: ({ req }) => {
    const { id, email } = req.user || {};
    return { id, email };
  },
});

app.use(auth);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status } = err;
  res.status(status).json(err);
};
app.use(errorHandler);
server.applyMiddleware({ app, path: "/graphql" });

app.get("/products", function (req, res) {
  res.send(categories);
});

if (!process.env.NOW_REGION) {
  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/graphql`);
  });
}

module.exports = app;
