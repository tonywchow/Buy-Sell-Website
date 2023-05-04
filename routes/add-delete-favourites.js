const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/', (req, res) => {
  const productId = req.body.productId;
  const userId = req.session.user_id;

  // if the product is already in the table, the user favourited it already, so delete it if the button is pressed.
  const checkQuery = `SELECT * FROM favourites WHERE product_id=$1 AND user_id=$2`;
  db.query(checkQuery, [productId, userId])
    .then(data => {
      if (data.rows.length > 0) {
        // if so, delete it
        const deleteQuery = `DELETE FROM favourites WHERE product_id=$1 AND user_id=$2`;
        db.query(deleteQuery, [productId, userId])
          .then(() => {
            res.send('removed');
          })
          .catch(err => {
            console.log(err);
            res.status(500).send(err);
          });
      } else {
        // Product hasn't been favourited yet. we add it.
        const insertQuery = `INSERT INTO favourites (product_id, user_id) VALUES ($1, $2)`;
        db.query(insertQuery, [productId, userId])
          .then(() => {
            res.send('added');
          })
          .catch(err => {
            console.log(err);
            res.status(500).send('Error adding product to favorites');
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = router;
