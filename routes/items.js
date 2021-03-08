/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const { categorizer } = require('../helpers/categorizer');

const express = require('express');
const router  = express.Router();
const { getUsersItems, addItem, editItem, deleteItem } = require('../db/item-queries.js');


router.get("/", (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    res.send('Not logged in!');
    return;
  }

  getUsersItems(userId)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));

});

router.post("/", (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
    res.send('Not logged in!');
    return;
  }

  categorizer(req.body.item)
    .then(data => addItem(userId, data, req.body.item))
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));

});

router.patch("/:id", (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
    res.send('Not logged in!');
    return;
  }

  editItem({...req.body, userId: userId, itemId: Number(req.params.id)})
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete("/:id", (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
    res.send('Not logged in!');
    return;
  }

  console.log(userId, Number(req.params.id))
  deleteItem(userId, Number(req.params.id))
    .then(data => res.send(data))
    .catch(err => res.status(500).json({ error: err.message }));
});



module.exports = router;


