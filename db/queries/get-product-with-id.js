const db = require("../connection");

/*
Get product and user information from productID
getProductWithId
*/
const getProductAndUserWithProductId = function (id) {
  const queryString = `
  SELECT products.*, name, email
  FROM products
  JOIN users on users.id = user_id
  WHERE products.id = $1`;
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

module.exports = {
  getProductAndUserWithProductId,
};
