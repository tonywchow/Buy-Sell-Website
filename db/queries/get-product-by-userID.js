const db = require("../connection");

function getProductByUserId(userId) {
  return `
  SELECT products.*, users.id as user_id, name, email
  FROM products
  JOIN users on users.id = user_id
  WHERE user_id = ${userId};
  `;
}

module.exports = { getProductByUserId };
