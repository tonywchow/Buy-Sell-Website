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

  let query = `
    SELECT products.*, users.id AS user_id, name, email, COALESCE(favourites.id, 0) AS favourite_id
    FROM products
    JOIN users ON users.id = products.user_id
    LEFT JOIN favourites ON favourites.product_id = products.id AND favourites.user_id = $1
  `;
  const queryParams = [req.session.user_id]; // Add the user ID to the query parameters.

  if (minPrice && maxPrice) {
    query += ' WHERE price BETWEEN $2 AND $3';
    queryParams.push(minPrice, maxPrice); // Add the min and max prices to the query parameters.
  } else if (minPrice) {
    query += ' WHERE price >= $2';
    queryParams.push(minPrice); // Add the min price to the query parameters.
  } else if (maxPrice) {
    query += ' WHERE price <= $2';
    queryParams.push(maxPrice); // Add the max price to the query parameters.
  }

  query = filterByCategory(category, query);

  if (sort === 'low-to-high') {
    query += ' ORDER BY price ASC';
  } else if (sort === 'high-to-low') {
    query += ' ORDER BY price DESC';
  }

  db.query(query, queryParams)
    .then(data => {
      const products = data.rows;
      const queryParams = req.query;
      const queryParamsWithoutUser = { ...queryParams };
      delete queryParamsWithoutUser[0]; // Remove the user ID from the query parameters.
      res.render('homepage', { products, queryParams: queryParamsWithoutUser });
    })
    .catch(err => {
      console.log(err);
      console.log(query)
      res.status(500).send('Error retrieving products from database');
    });
});


module.exports = router;
