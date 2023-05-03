const express = require("express");
const router = express.Router();
const db = require("../db/connection");

//Delete product
router.post("/:product_id/delete", (req, res) => {
  const product_id = req.params.product_id;
  console.log("#1 product_id: ", product_id);
  console.log("#2 result: ", req.body);
  const qs = `DELETE FROM products WHERE products.id=${product_id}`;

  db.query(qs)
    .then((result) => {
      console.log("result is: ", result);
      // res.send('Product deleted!');
      res.redirect("/mylistings");
    })
    .catch((err) => {
      console.log("error: ", err.message);
      res.send("Product cannot be deleted");
    });
});

module.exports = router;
