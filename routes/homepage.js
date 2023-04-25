// /*
//  * Displaying all items on homepage
//  /

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `
    SELECT * FROM products
    ORDER BY date ASC
    `
    )
      .then((result) => {
        console.log(result.rows);
      })
      .catch((error) => console.log(error));
  });
};

module.exports = router;
