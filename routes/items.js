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
        res.json(items); // replace with res.render(__.ejs, data.rows) when home page complete
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

    // replace category id with whatever is passed from client
    const values = [userId, req.body.category_id, req.body.name];
    let text = `
    INSERT INTO items
    VALUES ($1, $2, $3) RETURNING *;`

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
      values.push(req.body.name);
      text += `name = $${values.length}`;
    }

    if (req.body.done) {
      values.push(req.body.done);
      text += `done = $${values.length}`;
    }

    values.push(userId, Number(req.params.id));
    text += `WHERE user_id = $${values.length - 1} AND id = $${values.length} RETURNING *`;

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
