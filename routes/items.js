/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //gets all items for that user
  router.get("/", (req, res) => {
    const userId = req.session.user_id;
    if (!userId) {
      res.send('Not logged in!');
      return;
    }

    const text = `
    SELECT * FROM items
    WHERE user_id = $1`;
    const values = [userId];

    db.query(text, values)
      .then(data => {
        const items = data.rows;
        res.json(items);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
