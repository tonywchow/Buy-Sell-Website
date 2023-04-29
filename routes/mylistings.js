const express = require("express");
const router = express.Router();
const db = require('../db/connection');

// My Listings
router.get('/', (req, res) => {
  res.render('mylistings');
});

//Edit product
router.post('/edit/:product_id', (req, res) => {
  res.redirect('/create');
})

//Delete product
router.post('/delete/:product_id', (req, res) => {
  // const userId = req.session.userId;

  const qs = `DELETE FROM products WHERE user_id=1`;

  db.query(qs)
    .then((result) => {
      console.log('result is: ', result);
      // res.send('Product deleted!');
      res.redirect('/');
    })
    .catch((err) => {
      console.log('error: ', err.message);
      res.send('Product cannot be deleted');
    })

})


module.exports = router;
