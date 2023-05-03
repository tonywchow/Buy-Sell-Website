/*
 * All routes to create a new post are defined here
 * Since this file is loaded in server.js into /create,
 *   these routes are mounted onto /create
 */

const express = require("express");
const router = express.Router();
const createQuery = require("../db/queries/add-product");

router.get("/", (req, res) => {
  res.render("createform");
});

router.post("/", (req, res) => {
  userID = req.session.user_id;
  const newProduct = req.body;
  newProduct.user_id = userID;
  createQuery
    .addProduct(newProduct)
    .then(res.redirect("/mylistings"))
    .catch((error) => res.send(error));
});

module.exports = router;
