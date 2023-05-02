const express = require("express");
const router = express.Router();
const emailQuery = require("../db/queries/get-email-with-id");
const productQuery = require("../db/queries/get-product-with-id");
const sgMail = require("@sendgrid/mail");

router.get("/", (req, res) => {
  console.log("the users id", req.session.user_id);
  let userID = req.session.user_id;
  emailQuery
    .getEmailWithId(userID)
    .then((info) => {
      productQuery
        .getProductWithId(1) //currently the productID is hardcoded in the method for testing. Medhanie to integrate
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
    to: "lighthouselabtest1@gmail.com",
    from: "lighthouselabtest@gmail.com",
    subject: email.subject,
    text: email.message,
  };
  console.log(message);
  sgMail
    .send(message)
    .then((result) => console.log("Email sent..."))
    .catch((error) => console.log(error.message));
});

module.exports = router;
