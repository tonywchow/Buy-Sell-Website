const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const { getProductByUserId } = require("../db/queries/get-product-by-userID");

// Route to show products for a specific user
router.get("/", (req, res) => {
  const userId = req.session.user_id;

  const productQuery = getProductByUserId(userId);

  db.query(productQuery)
    .then((data) => {
      const products = data.rows || [];
      res.render("mylistings", { products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong");
    });
});

module.exports = router;
