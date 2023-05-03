const db = require("../connection");

//mark product as sold

const soldProduct = function (id) {
  const qs = `UPDATE products
              SET availability = false, title= 'SOLD!'
              WHERE products.id = $1`;

  const values = [id];

  return db.query(qs, values);
}

module.exports = {
  soldProduct,
}
