const db = require('../connection');

const update_products = (pool) => {
  const id = req.params.product_id;
  const title = req.body.title;
  const description = req.body.description;
  const thumbnail_photo_url = req.body.photoURL;
  const price = req.body.price;
  
  const query = `UPDATE products SET title = ${title}, description = ${description}, thumbnail_photo_url = ${thumbnail_photo_url}, price = ${price} WHERE products.id=${id}`;

  return pool.query(query);
};

module.exports = {
  update_products
};
