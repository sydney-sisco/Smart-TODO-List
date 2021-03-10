const express = require('express');
const router  = express.Router();
const { getItem } = require('../db/item-queries.js');
const { readDetails } = require('../helpers/APIs/read-api');

router.get('/:id', (req, res) => {
  getItem(req.params.id).then(item => {
    // if (items.category_id === 1) return 'Watch func';
    // if (items.category_id === 2) return 'Eat func';
    if (item.category_id === 3) return readDetails(item.name);
    // if (items.category_id === 4) return 'Buy func';
    // if (items.category_id === 5) return 'General';
  }).then(data => res.json(data));
});

module.exports = router;
