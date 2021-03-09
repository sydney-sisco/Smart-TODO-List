const axios = require('axios');

const movieAPIKEY = process.env.THE_MOVIE_DATABASE_API_KEY;

const getWatchDetails = (itemData) => {
  movieTitleEncoded = encodeURI(itemData.name);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieAPIKEY}&query=${movieTitleEncoded}`

  return axios.get(url).then(res => {
    // console.log(res.data);

    // loop through results and find the most recent release
    let latestMovie = res.data.results[0];

    for (const result of res.data.results) {
      console.log(result.original_title, 'from', Date(result.release_date));

      if (new Date(result.release_date) > new Date(latestMovie.release_date)) {
        latestMovie = result;
      }
    }

    itemData.details = {
      title: latestMovie.original_title,
      year: latestMovie.release_date.substring(0, 4),
      rating: latestMovie.vote_average * 10,
      thumbnail: `https://www.themoviedb.org/t/p/w188_and_h282_bestv2${latestMovie.poster_path}`
    }
    console.log('found:', itemData)
    return itemData
  }).catch(res => res);

};

module.exports = {
  getWatchDetails
};
