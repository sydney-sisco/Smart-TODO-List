const {getSearch} = require('./google-search.js')
const {googleCategorize} = require('./natural-language-api.js')
const {buyDB, readDB, watchDB, eatDB, generalDB} = require('./categories_db.js')
const item = 'time'

const dbCategorize = function(category) {

  if (watchDB[category]) return 1;
  if (eatDB[category]) return 2;
  if (readDB[category]) return 3;
  if (buyDB[category]) return 4;

  return 5;
}


getSearch(item)
.then(text => googleCategorize(text))
.then(category => {
  console.log(category)
  console.log(dbCategorize(category.name))
})

