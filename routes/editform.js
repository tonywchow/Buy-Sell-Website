/*
 * All routes to edit a new post are defined here
 * Since this file is loaded in server.js into /edit,
 *   these routes are mounted onto /edit
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");

//get product with product_id
router.get("/:product_id", (req, res) => {
  const id = req.params.product_id;
  //Select product and render editform
  const query = `SELECT * FROM products WHERE products.id=${id}`;
  db.query(query)
    .then((data) => {
      const product = data.rows[0];
      console.log(product);
      res.render("editform", { product });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving products from database");
    });
});

router.post("/:product_id/edit", (req, res) => {
  //retrieve all the product data from req.params and req.body
  const id = req.params.product_id;
  const title = req.body.title;
  const description = req.body.description;
  const thumbnail_photo_url = req.body.thumbnail_photo_url;
  const price = req.body.price;

  //Update prodcut based on the data obtained from the post request
  const query = `UPDATE products SET title = '${title}', description = '${description}', thumbnail_photo_url = '${thumbnail_photo_url}', price = ${price} WHERE products.id=${id}`;
  
  db.query(query)
    .then(() => {
      res
        .status(201)
        .redirect("/mylistings");
    }) //pass template vars with product list and a message
    .catch((error) => {
      res.status(500).send({ message: "Error on the server side :(", error });
    });
});
module.exports = router;
