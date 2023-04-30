const db = require('../connection');

const sortByLowToHigh = (query) => {
  return query + ' ORDER BY price ASC';
};

const sortByHighToLow = (query) => {
  return query + ' ORDER BY price DESC';
};

module.exports = { sortByLowToHigh, sortByHighToLow };
