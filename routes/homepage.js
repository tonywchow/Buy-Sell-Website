const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", (req, res) => {
  const userId = req.session.user_id;
  const query = `
    SELECT products.*, users.id as user_id, name, email, favourites.user_id as fav_user_id
    FROM products
    JOIN users ON users.id = products.user_id
    LEFT JOIN favourites ON favourites.product_id = products.id AND favourites.user_id = $1;
  `;
  db.query(query, [userId])
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

