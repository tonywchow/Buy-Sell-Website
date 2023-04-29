/*
 * All routes to create a new post are defined here
 * Since this file is loaded in server.js into /create,
 *   these routes are mounted onto /create
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const databaseQueries = require("../db/queries/databaseQueries");

router.get("/", (req, res) => {
  res.render("createform");
});

router.post("/", (req, res) => {
  userID = req.session.user_id;
  const newProduct = req.body;
  newProduct.user_id = userID;
  databaseQueries
    .addProduct(newProduct)
    // .then((product) => {
    //   res.send(product);
    //   console.log(result.rows);
    //   res.redirect("/");
    // })
    .catch((error) => res.send(error));
});

module.exports = router;
