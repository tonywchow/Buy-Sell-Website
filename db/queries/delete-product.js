const db = require("../connection");

//delete product by id

const deleteProductById = function (id) {
  const qs = `DELETE FROM products WHERE products.id= $1`;
  const values = [id];

  return db.query(qs, values);
}

module.exports = {
  deleteProductById,
}
