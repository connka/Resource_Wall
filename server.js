"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// ##### GET #####

// Home page
app.get("/", (req, res) => {
  res.render("index");
  //res.redirect("resources");
});

// Resources Wall
app.get("/resources", (req, res) => {
  res.render("resources");
});

// Registration
app.get("/register", (req, res) => {
  res.render("register");
});

// Users Page
app.get("/user/:id", (req, res) => {
  res.render("user");
});

// Login
app.get("/login", (req, res) => {
  res.redirect("/user/:id"); 
});

// Error Page
//User error
app.get("/error", (req, res) => {
  res.render("error");
});


// ###### POST #####

// Login 
app.post("/login", (req, res) => {
  let email = req.body["email"];
  let password = req.body["password"];
  if (!email || !password) {
    res.redirect("/error");
  }
  let id;
  for (user_id in users) {
    if (!users.hasOwnProperty(user_id)) {
      continue;
    }
    if (
      email === users[user_id]["email"] &&
      password === users[user_password]["password"]
    ) {
      id = user_id;
      break;
    }
  }
  if (id) {
    req.session.user_id = id;
    res.redirect("/resources");
  } else {
    res.redirect("/error");
  }
});

// Registration
app.post("/register", (req, res) => {
  res.redirect("/register");
});

// Logout
app.post("/logout", (req, res) => {
  res.redirect("/");
});

// Edit Users Handler
app.post("/user/:id", (req, res) => {
  res.render("user_edit");
});

// New Resource Handler
app.post("/resources", (req, res) => {
  res.redirect("resources");
});

// Port Listener
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
