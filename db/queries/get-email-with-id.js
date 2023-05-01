const db = require("../connection");

/*
Get user email from user id
*/
const getEmailWithId = function (id) {
  const queryString = `
  SELECT * FROM users
  WHERE id = $1
  `;
  console.log("database query test", id);
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
  getEmailWithId,
};
