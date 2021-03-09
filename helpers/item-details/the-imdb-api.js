const axios = require('axios');

// const movieAPIKEY = process.env.THE_MOVIE_DATABASE_API_KEY;

const getWatchDetails = (itemData) => {
  movieTitleEncoded = encodeURI(itemData.name);
  const url = `https://theimdbapi.com/api/find/movie?title=${movieTitleEncoded}`

  return axios.get(url).then(res => {
    console.log(res.data[0]);



    // itemData.details = null;
    itemData.details = {
      title: res.data[0].title,
      year: res.data[0].release_date.substring(0, 4),
      rating: res.data[0].content_rating,
      thumbnail: res.data[0].poster.thumb
    }
    return itemData
  }).catch(res => res);

};

module.exports = {
  getWatchDetails
};
