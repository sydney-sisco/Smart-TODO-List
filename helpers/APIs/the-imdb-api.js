const axios = require('axios');

const watchDetails = itemName => {
  const movieTitleEncoded = encodeURI(itemName);
  const url = `https://theimdbapi.com/api/find/movie?title=${movieTitleEncoded}`

  return axios.get(url).then(res => {
    return {
      title: res.data[0].title,
      year: (res.data[0].release_date) ? res.data[0].release_date.substring(0, 4) : null,
      rating: res.data[0].content_rating,
      thumbnail: res.data[0].poster.thumb,
      url: res.data[0].url.url,
    }
  }).catch(res => {
    console.log('catch:',res);
    return res});
};

module.exports = {
  watchDetails
};
