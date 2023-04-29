const db = require("../connection");

const getUserWithId = function (id) {
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1`;
  const values = [id];

  return db
    .query(queryString, values)
    .then((result) => {
      if (result.rows) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((error) => console.log(error));
};

const getAllProducts = (limit) => {
  limit = 10;

  let queryString = `
  SELECT * FROM products
  ORDER BY date ASC
  `;

  return db
    .query(queryString)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((error) => console.log(error));
};

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

//Getting user favourites
const getUserFavourites = function (admin_id) {
  const queryString = `
  SELECT product.*, favourites.* FROM favourites
  JOIN products on products.id = favourites.product_id
  JOIN users on users.id = favourites.user_id
  WHERE user_id = $1
  GROUP BY favourites.id
  ORDER BY date ASC
  `;

  const values = [guest_id];

  return db
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((error) => console.log(error));
};

module.exports = {
  getUserWithId,
  addProduct,
  getUserFavourites,
  getAllProducts,
};
