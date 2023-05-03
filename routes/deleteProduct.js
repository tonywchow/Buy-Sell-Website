const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const deleteProduct = require("../db/queries/delete-product");

//Delete product
router.post("/:product_id/delete", (req, res) => {
  const product_id = req.params.product_id;

  deleteProduct.deleteProductById(product_id)
    .then((result) => {
      console.log("result is: ", result);
      res.redirect("/mylistings");
    })
    .catch((err) => {
      console.log("error: ", err.message);
      res.send("Product cannot be deleted");
    });
});

module.exports = router;
