const db = require('../connection');

function getProductByUserId(userId) {
  return `
    SELECT *
    FROM products
    WHERE user_id = ${userId};
  `;
}

module.exports = { getProductByUserId }
