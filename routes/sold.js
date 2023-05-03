const express = require("express");
const router = express.Router();
const db = require("../db/connection");

//Mark item as sold
router.post("/:product_id/sold", (req, res) => {
  const product_id = req.params.product_id;
  const qs = `UPDATE products
              SET availability = false, title= 'SOLD!'
              WHERE products.id = ${product_id};`;

  db.query(qs)
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
