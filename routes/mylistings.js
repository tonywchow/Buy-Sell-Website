<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const db = require('../db/connection');

// My Listings
router.get('/', (req, res) => {
  res.render('mylistings');
});

//Edit product
router.post('/edit/:product_id', (req, res) => {
  res.redirect('/edit');
})

//Delete product
router.post('/delete/:product_id', (req, res) => {
  const product_id = req.session.product_id;

  const qs = `DELETE FROM products WHERE products.id=${product_id}`;

  db.query(qs)
    .then((result) => {
      // console.log('result is: ', result);
      // res.send('Product deleted!');
      res.redirect('/');
    })
    .catch((err) => {
      // console.log('error: ', err.message);
      res.send('Product cannot be deleted');
    })

})

//Mark item as sold
router.post('/sold/:product_id', (req, res) => {
  const qs = `UPDATE products
              SET availability = false, title= 'SOLD!'
              WHERE product.id = ${product_id};`

  db.query(qs)
    .then((result) => {
      console.log('result: ', result);
      res.redirect('/mylistings');
    })
    .catch((err) => {
      console.log('error: ', err);
      res.send('Product does not exist!');
    })

})


=======
const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `SELECT * FROM products`;
  db.query(query)
    .then(data => {
      const products = data.rows;
      res.render('mylistings', { products });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error retrieving products from database');
    });
});

>>>>>>> 8de8c0d94f4f834d0cb1fbfa3cb1757cf685ad59
module.exports = router;
