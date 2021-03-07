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

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
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

// additional restful routes


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const itemsRoutes = require("./routes/items");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/items", itemsRoutes(db));
// app.use("api", apiRoutes(db)); replace with api routes call when done
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

const dataFetcher = (conditionType, condition) => {
  const text = `
  SELECT *
  FROM users
  WHERE ${conditionType} = $1;`
  const values = [condition];

  return db.query(text, values);
};

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


app.get("/login", (req, res) => {
  if (!req.session.user_id) {
    const templateVars = { user: null };
    res.render('login', templateVars);
    return;
  }
  res.redirect('../../items/');
});

app.post('/login', (req, res) => {
  if(req.session.user_id) {
    res.status(400).send('Can\'t login while logged in');
    return;
  }
  const curEmail = req.body.loginEmail;
  const curPassword = req.body.loginPassword;

  dataFetcher('email', curEmail).then(data => {
    const userData = data.rows[0];
    // implement bcrypt (STRETCH)
    if (data.rowCount > 0 && userData.password === curPassword) {
      req.session.user_id = userData.id;
      res.redirect('/');
    }
    res.send('Incorrect email/password');
  }).catch(err => console.log('ERROR:', err));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
