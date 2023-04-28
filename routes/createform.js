/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("createform");
});

router.get("/:id", (req, res) => {
  if (req.session.user_id === "1") {
    console.log("logged in users");
  }
  console.log(req.session);
  console.log(req.params["id"]);
  res.render("createform");
});

router.post("/", (req, res) => {
  console.log(req.session.user_id);
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
