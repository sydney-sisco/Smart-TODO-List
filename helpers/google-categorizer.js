const {getSearch} = require('./google-search.js')
const {naturalLangCategorize} = require('./natural-language-api.js')
const {buyDB, readDB, watchDB, eatDB, generalDB} = require('./categories_db.js')
const item = 'beetle juice'

const dbCategorize = function(category) {

  if (watchDB[category]) return 1;
  if (eatDB[category]) return 2;
  if (readDB[category]) return 3;
  if (buyDB[category]) return 4;

  return 5;
}

const googleCategorize = function(item) {
  return getSearch(item)
    .then(text => naturalLangCategorize(text))
    .then(category => {
      console.log(category)
      return dbCategorize(category.name);
    })
    .catch(err => console.log('google categorizer failed:', err.message))

};

module.exports = {
  googleCategorize
}

