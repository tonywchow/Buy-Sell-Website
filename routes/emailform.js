const express = require("express");
const router = express.Router();
const emailQuery = require("../db/queries/get-email-with-userid");
const productQuery = require("../db/queries/get-product-and-user-with-productid");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

router.get("/:id", (req, res) => {
  let productID = req.params.id;
  let userID = req.session.user_id;
  emailQuery
    .getEmailWithUserId(userID)
    .then((info) => {
      productQuery
        .getProductAndUserWithProductId(productID) //currently the productID is hardcoded in the method for testing. Medhanie to integrate
        .then((product) => {
          let templateVars = {
            product,
            info,
          };
          res.render("emailform", templateVars);
        })
        .catch((error) => res.send(error));
    })
    .catch((error) => res.send(error));
});

router.post("/", (req, res) => {
  console.log(req.body);
  const email = req.body;
  const message = {
    to: process.env.recipientEmail,
    from: process.env.senderEmail,
    subject: email.subject,
    text: email.message,
  };
  console.log(message);
  sgMail
    .send(message)
    .then(res.redirect("/"))
    .catch((error) => console.log(error.message));
});

module.exports = router;
