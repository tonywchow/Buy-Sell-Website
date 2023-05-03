/*
 * All routes to edit a new post are defined here
 * Since this file is loaded in server.js into /edit,
 *   these routes are mounted onto /edit
 */

const express = require("express");
const router = express.Router();
const db = require('../db/connection');


router.get("/:product_id", (req, res) => {
  // console.log(req.params.product_id);
  const id = req.params.product_id;
  // console.log('result: ', req.body);
  const query = `SELECT * FROM products WHERE products.id=${id}`;
  db.query(query)
    .then(data => {
      const product = data.rows[0];
      // console.log('products: ', product);
      res.render('editform', { product });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error retrieving products from database');
    });
  // res.render("editform");
});

router.post("/:product_id/edit", (req, res) => {
  // console.log("#1 result", req.body);
  // console.log("#2 title", req.body.title);
  // console.log("#3 query", req.query);
  const id = req.params.product_id;
  const title = req.body.title;
  const description = req.body.description;
  const thumbnail_photo_url = req.body.photoURL;
  const price = req.body.price;
  const query = `UPDATE products SET title = ${title}, description = ${description}, thumbnail_photo_url = ${thumbnail_photo_url}, price = ${price} WHERE products.id=${id}`;
//   UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
  res.redirect("/mylistings");
});
module.exports = router;
