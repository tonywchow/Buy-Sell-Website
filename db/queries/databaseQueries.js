const db = require("../connection");

/*
Get product information from productID
*/
const getProductWithId = function (id) {
  const queryString = `
  SELECT *
  FROM products
  WHERE id = $1`;
  const values = [id];

  return db
    .query(queryString, values)
    .then((result) => {
      if (result.rows) {
        // console.log("test", result.rows);
        return result.rows[0];
      } else {
        return null;
      }
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
  getProductWithId,
  addProduct,
  editProduct,
  getUserFavourites,
};
