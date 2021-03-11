/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { dataFetcher, insertUserAndReturn, updateUserInfo } = require('../db/user-queries');
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
    if (data.rowCount === 0) {
      return insertUserAndReturn(req.body);
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
    // implement bcrypt (STRETCH)
    if (data.rowCount > 0 && userData.password === curPassword) {
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
    newPassword: req.body.updatePassword
  }
  updateUserInfo(userInfo)
    .then(data => res.redirect('/'))
    .catch(err => {
      console.log('ERROR UPDATING USER INFO', err.message);
      res.send('Something went wrong updating your details');
    });
});

module.exports = router;


