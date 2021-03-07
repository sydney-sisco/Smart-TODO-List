const axios = require('axios')
const dotenv = require('dotenv')

const getSearch = function(item){
  const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.SEARCH_API_KEY}&cx=86344fcce8506a74a&q=${item}`
  let text = ''
  return axios.get(url)
    .then(res => {
      res.data.items.forEach(elem => text += elem.snippet + ' ')
      return text;
    })
    .catch(err => console.log('search-api failed', err.message))
}

module.exports = {
  getSearch
};
