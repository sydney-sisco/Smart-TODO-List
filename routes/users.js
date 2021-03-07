/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { dataFetcher, insertUserAndReturn } = require('../db/user-queries');
const express = require('express');
const router  = express.Router();


// router.get('/login/:id', (req, res) => {
//   req.session.user_id = req.params.id;
//   res.redirect('../../items/');
// });

router.post('/', (req, res) => {
  if(req.session.user_id) {
    res.status(400).send('Can\'t register while logged in. Please clear your session ID.');
    return;
  }
  if (!req.body.registerEmail || !req.body.registerPassword || !req.body.registerFname || !req.body.registerLname) {
    res.status(400).send('Empty Fields!');
    return;
  }
  dataFetcher('email', req.body.registerEmail)
    .then(data => {
    if (data.rowCount > 0) {
      res.status(400).send('Email already present in our database.');
    }
  })
    .then(() => insertUserAndReturn(req.body))
    .then(userID => {
    req.session.user_id = userID;
    res.redirect('/');
  });

});

router.post('/login', (req, res) => {
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
      return;
    }
    res.send('Incorrect email/password');
  }).catch(err => console.log('ERROR:', err));
});

module.exports = router;


