const db = require("../connection");

//Edit a post
const editProduct = function (productID, product) {
  let queryString = `
  UPDATE products SET title = $1, description = $2, thumbnail_photo_url = $3, price = $4
  WHERE id = $5
  `;

  let values = [
    product.title,
    product.description,
    product.thumbnail_photo_url,
    product.price,
    productID,
  ];

  return db
    .query(queryString, values)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => console.log(error));
};

module.exports = {
  editProduct,
};
