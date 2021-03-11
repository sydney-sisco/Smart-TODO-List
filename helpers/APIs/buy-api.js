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
      return {
        title: productInfo.title,
        price: productInfo.price.raw + ' ' + productInfo.price.currency,
        rating: productInfo.rating,
        link: productInfo.link,
        thumbnail: productInfo.image,
      };

    }).catch(err => console.log('Buy Details API failed', err));

};

module.exports = { buyDetails };
