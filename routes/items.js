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

  router.post("/:id", (req, res) => {
    const userId = req.session.user_id;

    if (!userId) {
      res.send('Not logged in!');
      return;
    }

    // replace category id with whatever the api call gets us
    const values = [userId, req.body.category_id, req.body.name];
    let text = `
    INSERT INTO items
    VALUES ($1, $2, $2) RETURNING *;`

    db.query(text, values)
      .then(data => {
        res.json(data.rows[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.patch("/:id", (req, res) => {
    const userId = req.session.user_id;

    if (!userId) {
      res.send('Not logged in!');
      return;
    }

    const values = [];

    let text = `
    UPDATE items
    SET`

    if (req.body.name) {
      text += `name = $1`;
      values.push(req.body.name);
    }

    if (req.body.done) {
      text += `done = $2`;
      values.push(req.body.done);
    }

    text += `WHERE user_id = $3 AND id = $4 RETURNING *`;
    values.push(userId, Number(req.params.id));

    db.query(text, values)
      .then(data => {
        res.json(data.rows[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.delete("/:id", (req, res) => {
    const userId = req.session.user_id;

    if (!userId) {
      res.send('Not logged in!');
      return;
    }

    let text = `
    DELETE FROM items
    WHERE user_id = $1 AND id = $2 RETURNING *`;

    const values = [userId, Number(req.params.id)];

    db.query(text, values)
      .then(data => {
        res.send('Deleted');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
