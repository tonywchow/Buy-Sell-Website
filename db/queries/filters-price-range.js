const db = require('../connection');


const filterByMinPrice = (minPrice, query) => {
  return query + ` AND price >= $${query.length + 1}`;
};

const filterByMaxPrice = (maxPrice, query) => {
  return query + ` AND price <= $${query.length + 1}`;
};

const filterByPriceRange = (minPrice, maxPrice, query) => {
  return query + ` AND price BETWEEN $${query.length + 1} AND $${query.length + 2}`;
};

module.exports = { filterByMinPrice, filterByMaxPrice, filterByPriceRange };
