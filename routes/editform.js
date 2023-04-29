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
  databaseQueries
    .getProductWithId(13)
    .then((product) => {
      // res.send(product);
      console.log("from EJS", product.title);
      res.render("editform", { product });
    })
    .catch((error) => res.send(error));
});

module.exports = router;
