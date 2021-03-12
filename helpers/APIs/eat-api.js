const yelp = require('yelp-fusion');
const yelpAPIKey = process.env.YELP_API_KEY;
const client = yelp.client(yelpAPIKey);

const eatDetails = itemName => {
  const nameEncoded = encodeURI(itemName);

  const searchRequest = {
    term: encodeURI(itemName),
    location: 'Vancouver',
    limit: 1,
  };

  return client.search(searchRequest).then(response => {

    if (response.jsonBody.businesses.length) {
      const result = response.jsonBody.businesses[0];
      const returnData = {
        name: result.name,
        distance: result.distance,
        rating: result.rating,
        thumbnail: result.image_url,
        url: result.url,
      }
      return returnData;

    } else {
      return null;
    }

  }).catch(res => {
    console.log(res);
    return res;
  })
};

module.exports = {
  eatDetails
};
