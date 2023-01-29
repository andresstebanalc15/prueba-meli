const db = require("../adapter");

function list() {
  return db.get("products").value();
}

function find(id) {
  const product = db.get("products").find({ id: id.id.toString() }).value();
  return {
    ...product,
  };
}

module.exports = { list, find };
