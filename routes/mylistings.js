const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { getProductByUserId } = require('../db/queries/get-product-by-userID');

// Route to show products for a specific user
router.get('/myproducts/:id', (req, res) => {
  const userId = req.params.id;
  const productQuery = getProductByUserId(userId);

  db.query(productQuery)
    .then((result) => {
      const products = result.rows;
      res.render('index', { products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Something went wrong');
    });
});

module.exports = router;

