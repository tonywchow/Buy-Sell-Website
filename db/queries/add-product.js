const db = require("../connection");

/*
Adding product to database
*/
const addProduct = function (products) {
  let queryString = `
  INSERT INTO products(user_id, title, description, thumbnail_photo_url, price)
  VALUES ($1, $2, $3, $4, $5)
  `;

  let values = [
    products.user_id,
    products.title,
    products.description,
    products.thumbnail_photo_url,
    products.price,
  ];
  return db
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((error) => console.log(error));
};

module.exports = {
  addProduct,
};
