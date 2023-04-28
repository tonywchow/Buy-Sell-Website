/*
 * All routes to create a new post are defined here
 * Since this file is loaded in server.js into /create,
 *   these routes are mounted onto /create
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("editform");
});

module.exports = router;
