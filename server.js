// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const db = require("./db/connection");

const PORT = process.env.PORT || 8080;
const app = express();
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

//SendGrid API
const API_KEY = process.env.APIKEY;
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(API_KEY);

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const createPost = require("./routes/createform");
const editPost = require("./routes/editform");
const login = require("./routes/login");
const email = require("./routes/emailform");
const homepageRouter = require("./routes/homepage");
const productFiltersRouter = require("./routes/productfilters");
const myListingsRouter = require("./routes/mylistings");
const favouritesRouter = require("./routes/favourites");
const deleteProductRouter = require("./routes/deleteProduct");
const soldRouter = require("./routes/sold");
const addDeleteFavourites = require("./routes/add-delete-favourites");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/create", createPost);
app.use("/editform", editPost);
app.use("/", homepageRouter);
app.use("/login", login);
app.use("/email", email);
app.use("/filters", productFiltersRouter);
app.use("/mylistings", myListingsRouter);
app.use("/favourites", favouritesRouter);
app.use("/delete", deleteProductRouter);
app.use("/sold", soldRouter);
app.use("/add-delete-favourites", addDeleteFavourites);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("homepage");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
