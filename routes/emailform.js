const express = require("express");
const router = express.Router();
const databaseQueries = require("../db/queries/databaseQueries");

router.get("/", (req, res) => {
  console.log("the users id", req.session.user_id);
  let userID = req.session.user_id;
  databaseQueries
    .getEmailWithId(userID)
    .then((info) => {
      databaseQueries
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
});

module.exports = router;
