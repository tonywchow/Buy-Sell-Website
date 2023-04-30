const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { filterByMinPrice, filterByMaxPrice, filterByPriceRange } = require('../db/queries/filters-price-range');
const { sortByLowToHigh, sortByHighToLow } = require('../db/queries/filters-sort-price');

router.get('/', (req, res) => {
  const minPrice = req.query['min-price'];
  const maxPrice = req.query['max-price'];
  const sort = req.query.sort;

  let query = 'SELECT * FROM products';

  if (minPrice && maxPrice) {
    query = filterByPriceRange(minPrice, maxPrice);
  } else if (minPrice) {
    query = filterByMinPrice(minPrice);
  } else if (maxPrice) {
    query = filterByMaxPrice(maxPrice);
  }

  if (sort === 'low-to-high') {
    query = sortByLowToHigh(query);
  } else if (sort === 'high-to-low') {
    query = sortByHighToLow(query);
  }

  db.query(query)
    .then(data => {
      const products = data.rows;
      console.log(products)
      res.render('homepage', { products });
    })
    .catch(err => {
      console.log(err);
      console.log(query)
      res.status(500).send('Error retrieving products from database');
    });
});



module.exports = router;
