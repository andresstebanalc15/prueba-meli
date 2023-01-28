const db = require("../adapter");

function list() {
  return db.get("products").value();
}

module.exports = { list };
