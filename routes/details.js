const express = require('express');
const router  = express.Router();
const { getItem } = require('../db/item-queries.js');
const { buyDetails } = require('../helpers/APIs/buy-api.js');
const { readDetails } = require('../helpers/APIs/read-api');
const { watchDetails } = require('../helpers/APIs/the-imdb-api');
// const { watchDetails } = require('../helpers/APIs/the-movie-database-api');
const { eatDetails } = require('../helpers/APIs/eat-api');

router.get('/:id', (req, res) => {
  getItem(req.params.id).then(item => {
    if (item.category_id === 1) return watchDetails(item.name);
    if (item.category_id === 2) return eatDetails(item.name);
    if (item.category_id === 3) return readDetails(item.name);
    if (item.category_id === 4) return buyDetails(item.name);
    // if (item.category_id === 5) return 'General';
  }).then(data => res.json(data));
});

module.exports = router;
