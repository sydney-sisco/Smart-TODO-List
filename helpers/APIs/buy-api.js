const axios = require('axios');
const dotenv = require('dotenv');

const buyDetails = (query) => {
  const params = {
    api_key: process.env.RAINFOREST_API_KEY,
    type: "search",
    amazon_domain: "amazon.ca",
    output: "json",
    search_term: query,
    sort_by: "featured",
    page: "1",
    language: "en_US"
  }

  return axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {
      const productInfo = response.data.search_results[0];
      console.log(productInfo);
      return {
        title: productInfo.title,
        price: productInfo.price.raw + ' ' + productInfo.price.currency,
        rating: productInfo.rating,
        link: productInfo.link,
        thumbnail: productInfo.image,
      };

    }).catch(err => console.log('Buy Details API failed', err));

};

// buyDetails('popcorn');

module.exports = { buyDetails };

// TODO:

// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword',
//   params: {page: '1', keyword: 'Playstation 4', type: 'text', sortBy: 'best_match'},
//   headers: {
//     'x-rapidapi-key': '52dff6c024mshd8c5971a42f1a78p14e32fjsn62e92cc819d2',
//     'x-rapidapi-host': 'axesso-walmart-data-service.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
