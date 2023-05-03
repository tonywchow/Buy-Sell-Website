const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const { getProductByUserId } = require("../db/queries/get-product-by-userID");

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

// //Mark item as sold
// router.post("/:product_id/sold", (req, res) => {
//   const product_id = req.params.product_id;
//   const qs = `UPDATE products
//               SET availability = false, title= 'SOLD!'
//               WHERE products.id = ${product_id};`;

//   db.query(qs)
//     .then((result) => {
//       console.log("result: ", result);
//       res.redirect("/mylistings");
//     })
//     .catch((err) => {
//       console.log("error: ", err);
//       res.send("Product does not exist!");
//     });
// });

// Route to show products for a specific user
router.get("/", (req, res) => {
  const userId = req.session.user_id;

  const productQuery = getProductByUserId(userId);

  db.query(productQuery)
    .then((data) => {
      const products = data.rows || [];
      res.render("mylistings", { products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong");
    });
});

module.exports = router;
