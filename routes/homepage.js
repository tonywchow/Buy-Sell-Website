const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", (req, res) => {
  const query = `
  SELECT products.*, users.id as user_id, name, email
  FROM products
  JOIN users on users.id = user_id
  `;
  db.query(query)
    .then((data) => {
      const products = data.rows;
      res.render("homepage", { products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving products from database");
    });
});

module.exports = router;
