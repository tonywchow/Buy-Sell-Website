const db = require('../connection');


const filterByMinPrice = (minPrice) => {
  return `SELECT * FROM products WHERE price >= ${minPrice}`;
};


const filterByMaxPrice = (maxPrice) => {
  return `SELECT * FROM products WHERE price <= ${maxPrice};`
};

const filterByPriceRange = (minPrice, maxPrice) => {
  return `SELECT * FROM products WHERE price BETWEEN ${minPrice} AND ${maxPrice};`
};

// const sortByLowToHighPrice = () => {
//   return db.query('SELECT * FROM products ORDER BY price ASC;')
//     .then(data => {
//       return data.rows;
//     });
// };

// const sortByHighToLowPrice = () => {
//   return db.query('SELECT * FROM products ORDER BY price DESC;')
//     .then(data => {
//       return data.rows;
//     });
// };


module.exports = { filterByMinPrice, filterByMaxPrice, filterByPriceRange };
