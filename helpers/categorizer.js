const axios = require('axios');
const {wolframCategorize} = require('./wolfram-categorizer.js')
const {googleCategorize} = require('./google-categorizer.js')

module.exports = {
  categorizer: googleCategorize
};
