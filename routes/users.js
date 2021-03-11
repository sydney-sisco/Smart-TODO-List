/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { dataFetcher, insertUserAndReturn, updateUserInfo } = require('../db/user-queries');
const express = require('express');
const router  = express.Router();

// use bcrypt to hash passwords
const bcrypt = require('bcrypt');

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
    if (data.rowCount === 0) {
      return insertUserAndReturn({
        registerFname: req.body.registerFname,
        registerLname: req.body.registerLname,
        registerEmail: req.body.registerEmail,
        registerPassword: bcrypt.hashSync(req.body.registerPassword, 10),
      });
    }
    res.status(400).send('Email already present in our database.');
  }).then(userID => {
    if (userID) {
      req.session.user_id = userID;
      res.redirect('/');
    }
  }).catch(err => console.log(err));
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
    console.log('from the db:',userData);
    console.log('login password:',curPassword);
    console.log('bc:', bcrypt.compareSync(curPassword, userData.password));
    // TODO:implement bcrypt (STRETCH)

    // if (data.rowCount > 0 && userData.password === curPassword) {
    if (data.rowCount > 0 && bcrypt.compareSync(curPassword, userData.password)) {
      req.session.user_id = userData.id;
      res.redirect('/');
      return;
    }
    res.send('Incorrect email/password');
  }).catch(err => console.log('ERROR:', err));
});

router.patch('/', (req, res) => {
  if (!req.session.user_id) {
    res.send('Not logged in!');
    return;
  }
  const userInfo = {
    userId: req.session.user_id,
    newFname: req.body.updateFname,
    newLname: req.body.updateLname,
    newPassword: bcrypt.hashSync(req.body.updatePassword, 10),
    // newPassword: req.body.updatePassword
  }
  updateUserInfo(userInfo)
    .then(data => res.redirect('/'))
    .catch(err => {
      console.log('ERROR UPDATING USER INFO', err.message);
      res.send('Something went wrong updating your details');
    });
});

module.exports = router;


