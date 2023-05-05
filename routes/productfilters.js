const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { filterByMinPrice, filterByMaxPrice, filterByPriceRange } = require('../db/queries/filters-price-range');
const { sortByLowToHigh, sortByHighToLow } = require('../db/queries/filters-sort-price');
const { filterByCategory } = require('../db/queries/filters-category');

router.get('/', (req, res) => {
  const minPrice = req.query['min-price'];
  const maxPrice = req.query['max-price'];
  const sort = req.query.sort;
  const category = req.query.category;

  let query = 'SELECT * FROM products';
  const queryParams = {}; // Initialize an empty object to store query parameters.

  if (minPrice && maxPrice) {
    query = filterByPriceRange(minPrice, maxPrice);
    queryParams['min-price'] = minPrice;
    queryParams['max-price'] = maxPrice;
  } else if (minPrice) {
    query = filterByMinPrice(minPrice);
    queryParams['min-price'] = minPrice;
  } else if (maxPrice) {
    query = filterByMaxPrice(maxPrice);
    queryParams['max-price'] = maxPrice;
  }

  query = filterByCategory(category, query);
  queryParams['category'] = category;

  if (sort === 'low-to-high') {
    query = sortByLowToHigh(query);
    queryParams['sort'] = 'low-to-high';
  } else if (sort === 'high-to-low') {
    query = sortByHighToLow(query);
    queryParams['sort'] = 'high-to-low';
  }

  db.query(query)
    .then(data => {
      const products = data.rows;
      res.render('homepage', { products, queryParams }); // Pass the queryParams object to the template.
    })
    .catch(err => {
      console.log(err);
      console.log(query)
      res.status(500).send('Error retrieving products from database');
    });
});


module.exports = router;
