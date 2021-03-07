const db = require('../lib/db.js');

const getUsersItems = function(userId) {
  const text = `
  SELECT * FROM items
  WHERE user_id = $1`;
  const values = [userId];

  return db.query(text, values)
    .then(data => data.rows)
    .catch(err => console.error(this, 'query failed', err.stack));
};

const addItem = function(userId, categoryId = 5, name) {
  const text = `
  INSERT INTO items (user_id, category_id, name)
  VALUES ($1, $2, $3) RETURNING *;`;
  const values = [userId, categoryId, name];

  return db.query(text, values)
    .then(data => data.rows[0])
    .catch(err => console.error(this, 'query failed', err.stack));
};

const editItem = function(params) {
  const values = [];
  let text = `
  UPDATE items
  SET`;

  if (params.name) {
    values.push(params.name);
    text += `name = $${values.length}`;
  }

  if (params.done) {
    values.push(req.body.done);
    text += `done = $${values.length}`;
  }

  values.push(params.userId, params.itemId);
  text += `WHERE user_id = $${values.length - 1} AND id = $${values.length} RETURNING *`;

  return db.query(text, values)
    .then(data => data.rows[0])
    .catch(err => console.error(this, 'query failed', err.stack));
};

const deleteItem = function(userId, itemId) {
  let text = `
  DELETE FROM items
  WHERE user_id = $1 AND id = $2 RETURNING *`;
  const values = [userId, itemId];

  return db.query(text, values)
    .then(data => 'Deleted')
    .catch(err => console.error(this, 'query failed', err.stack));
};


module.exports = {
  getUsersItems,
  addItem,
  editItem,
  deleteItem
};

