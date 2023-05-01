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

module.exports = {
  getProductWithId,
};
