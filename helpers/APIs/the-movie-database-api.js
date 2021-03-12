const axios = require('axios');

const movieAPIKEY = process.env.THE_MOVIE_DATABASE_API_KEY;

const watchDetails = itemName => {
  const movieTitleEncoded = encodeURI(itemName);
  const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${movieAPIKEY}&query=${movieTitleEncoded}`
  const showURL = `https://api.themoviedb.org/3/search/tv?api_key=${movieAPIKEY}&query=${movieTitleEncoded}`

  const moviePromise = axios.get(movieURL).then(res => {
    if (res.data.results.length) {
      let movie = res.data.results[0];

      const returnData = {
        title: movie.original_title,
        year: movie.release_date.substring(0, 4),
        rating: movie.vote_average * 10,
        thumbnail: `https://www.themoviedb.org/t/p/w188_and_h282_bestv2${movie.poster_path}`,
        vote_count: movie.vote_count,
        url: `https://www.themoviedb.org/movie/${movie.id}`,
      }
      return returnData;
    } else {
      return null;
    }
  })

  const showPromise = axios.get(showURL).then(res => {
    if (res.data.results.length) {
      let show = res.data.results[0];

      const returnData = {
        title: show.name,
        rating: show.vote_average * 10,
        thumbnail: `https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.poster_path}`,
        vote_count: show.vote_count,
        url: `https://www.themoviedb.org/tv/${show.id}`,
      }
      return returnData;
    } else {
      return null;
    }
  })

  return Promise.allSettled([moviePromise, showPromise]).then((results) => {
    const movieResults = results[0].value;
    const showResults = results[1].value;

    if(!movieResults && !showResults) {
      return null;
    }

    if(!movieResults) {
      return showResults;
    }

    if(!showResults) {
      return movieResults;
    }

    if (movieResults.vote_count >= showResults.vote_count) {
      return movieResults;
    } else {
      return showResults;
    }
  }).catch(res => {
    console.log(res);
    return res;
  });
};

module.exports = {
  watchDetails
};
