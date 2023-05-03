const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const markAsSold = require("../db/queries/mark-as-sold");

//Mark item as sold
router.post("/:product_id/sold", (req, res) => {
  const product_id = req.params.product_id;

  markAsSold.soldProduct(product_id)
    .then((result) => {
      console.log("result: ", result);
      res.redirect("/mylistings");
    })
    .catch((err) => {
      console.log("error: ", err);
      res.send("Product does not exist!");
    });
});

module.exports = router;
