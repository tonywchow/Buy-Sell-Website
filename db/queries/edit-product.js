const db = require("../connection");

//Edit a post
const editProduct = function (productID, product) {
  let queryString = `
  UPDATE products SET title = $1, description = $2, thumbnail_photo_url = $3, price = $4, category = $5
  WHERE id = $6;
  `;

  let values = [
    product.title,
    product.description,
    product.thumbnail_photo_url,
    product.price,
    product.category,
    productID
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
