const axios = require('axios');

const movieAPIKEY = process.env.THE_MOVIE_DATABASE_API_KEY;

const getWatchDetails = (movieTitle) => {
  movieTitleEncoded = encodeURI(movieTitle);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieAPIKEY}&query=${movieTitleEncoded}`

  return axios.get(url).then(res => {
    console.log(res.data);

    for (const result of res.data.results) {
      console.log(result.original_title);

      if (movieTitle.toLowerCase() === result.original_title.toLowerCase()) {
        return result;
      }
    }

    return res.data.results[0];
  }).catch(res => res);

};

// fetchMovieDetails(process.argv[2])
// .then((res) => {
//   console.log(res);
//   console.log('User Input:', process.argv[2], 'Search Result:', res.original_title);
//   if (process.argv[2].toLowerCase() === res.original_title.toLowerCase()) {
//     console.log('Overview:',res.overview);
//     console.log('Rating:', (res.vote_average * 10), '%');
//     console.log('thumbname url:', `https://www.themoviedb.org/t/p/w188_and_h282_bestv2${res.poster_path}`)
//   }
// });

module.exports = {
  getWatchDetails
};
