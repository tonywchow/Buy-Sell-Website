/*
 * All routes to create a new post are defined here
 * Since this file is loaded in server.js into /create,
 *   these routes are mounted onto /create
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require('../db/connection');


router.get("/:product_id", (req, res) => {
  const id = req.params.product_id;
  const query = `SELECT * FROM products WHERE products.id=${id}`;
  db.query(query)
    .then(data => {
      const product = data.rows[0];
      res.render('editform', { product });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error retrieving products from database');
    });
});

router.post("/:product_id/edit", (req, res) => {
  // console.log("#1 result", req.body);
  // console.log("#2 title", req.body.title);
  // console.log("#3 query", req.query);
  const id = req.params.product_id;
  // console.log("#4 id ", id);
  const title = req.body.title;
  const description = req.body.description;
  const thumbnail_photo_url = req.body.photoURL;
  const price = req.body.price;
  const query = `UPDATE products SET title = '${title}', description = '${description}', thumbnail_photo_url = '${thumbnail_photo_url}', price = ${price} WHERE products.id=${id}`;
  console.log("query: ", query);
  db.query(query)
    .then(() => {
      res.status(201).send({ message: 'product updated successfully!'});
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error on the server side :(', error })
    })

});
module.exports = router;
