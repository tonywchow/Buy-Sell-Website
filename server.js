// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const homepageRouter = require("./routes/homepage");
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
const userApiRoutes = require("./routes/users-api");
const widgetApiRoutes = require("./routes/widgets-api");
const usersRoutes = require("./routes/users");
const createPost = require("./routes/createform");
const editPost = require("./routes/editform");
const login = require("./routes/login");
const email = require("./routes/emailform");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/users", userApiRoutes);
app.use("/api/widgets", widgetApiRoutes);
app.use("/users", usersRoutes);
app.use("/create", createPost);
app.use("/edit", editPost);
app.use("/", homepageRouter);
app.use("/login", login);
app.use("/email", email);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("homepage");
});

// My Listings
app.get("/mylistings", (req, res) => {
  res.render("mylistings");
});

// Favourites
app.get("/favourites", (req, res) => {
  res.render("favourites");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});