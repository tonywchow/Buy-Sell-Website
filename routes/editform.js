/*
 * All routes to edit a new post are defined here
 * Since this file is loaded in server.js into /edit,
 *   these routes are mounted onto /edit
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const databaseQueries = require("../db/queries/databaseQueries");

//This GET HTTP request is to get product information from productID once the edit button is clicked in /mylistings route. This will auto populate the forms in the EJS file
router.get("/", (req, res) => {
  databaseQueries
    .getProductWithId(1) //currently the productID is hardcoded in the method for testing. Medhanie to integrate
    .then((product) => {
      console.log(product.price);
      res.render("editform", { product });
    })
    .catch((error) => res.send(error));
});

//This POST HTTP request is to POST the edited product information once the submit button is clicked
router.post("/", (req, res) => {
  const changesToProduct = req.body;
  databaseQueries
    .editProduct(1, changesToProduct) //currently the productID is hardcoded in the method for testing. Medhanie to integrate. editProduct function takes in two parameters, the productID and the information from the forms through req.body
    .then(res.redirect("/edit"))
    .catch((error) => res.send(error));
});

module.exports = router;
