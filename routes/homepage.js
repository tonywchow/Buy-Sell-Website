const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `SELECT * FROM products`;
  db.query(query)
    .then(data => {
      const products = data.rows;
      res.render('homepage', { products });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error retrieving products from database');
    });
});

module.exports = router;
