const db = require("../connection");

/*
Adding product to database
*/
const addProduct = function (products) {
  let queryString = `
  INSERT INTO products(user_id, title, description, thumbnail_photo_url, price, category)
  VALUES ($1, $2, $3, $4, $5, $6);
  `;

  let values = [
    products.user_id,
    products.title,
    products.description,
    products.thumbnail_photo_url,
    products.price,
    products.category
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
