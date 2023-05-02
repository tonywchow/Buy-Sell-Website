const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {

  const query = `SELECT * FROM products JOIN favourites ON products.id=product_id`;
  db.query(query)
    .then(data => {
      console.log('result: ', data);
      const products = data.rows;

      res.render('favourites', { products });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error retrieving products from database');
    });
});

module.exports = router;

