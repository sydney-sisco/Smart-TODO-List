// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const { dataFetcher } = require('./db/user-queries');

// PG database client/connection setup
const db = require('./lib/db.js');
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

// override for put, patch and delete methods
app.use(methodOverride('_method'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRouter = require("./routes/users.js");
const itemsRouter = require("./routes/items.js");
const detailsRouter = require("./routes/details.js");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/details", detailsRouter);

// app.use("api", apiRoutes(db)); replace with api routes call when done

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  if (!req.session.user_id) {
    res.redirect('/login');
    return;
  }
  dataFetcher('id', req.session.user_id).then(data => {
    const templateVars = { user: data.rows[0] };
    res.render("index", templateVars);
  });
});

app.get('/register', (req, res) => {
  if (!req.session.user_id) {
    const templateVars = { user: null };
    res.render('register', templateVars);
    return;
  }
  res.redirect('/');
})

app.get("/login", (req, res) => {
  if (!req.session.user_id) {
    const templateVars = { user: null };
    res.render('login', templateVars);
    return;
  }
  res.redirect('/');
});

app.get('/update', (req, res) => {
  if (!req.session.user_id) {
    res.redirect('/login');
    return;
  }
  dataFetcher('id', req.session.user_id).then(data => {
    const templateVars = { user: data.rows[0] };
    res.render("update", templateVars);
  });
});

app.get('/logout', (req, res) => {
  req.session.user_id = null;
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`NotSoSmart listening on port ${PORT}`);
});
