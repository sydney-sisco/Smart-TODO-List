const yelp = require('yelp-fusion');
const yelpAPIKey = process.env.YELP_API_KEY;
const client = yelp.client(yelpAPIKey);

const eatDetails = itemName => {

  const nameEncoded = encodeURI(itemName);

  console.log(nameEncoded);

  const searchRequest = {
    term: encodeURI(itemName),
    location: 'Vancouver',
    limit: 1,
  };

  return client.search(searchRequest).then(response => {

    console.log(response.jsonBody.businesses);

    const result = response.jsonBody.businesses[0];
    console.log(result);
    // const firstResult = response.jsonBody.businesses[0];
    // const prettyJson = JSON.stringify(firstResult, null, 4);
    // console.log(prettyJson);


    const returnData = {
      name: result.name,
      distance: result.distance,
      rating: result.rating,
      thumbnail: result.image_url,
      url: result.url,
    }
    console.log('returning:', returnData);
    return returnData;

  }).catch(e => {
    console.log(e);
  }).catch(res => res);
};

module.exports = {
  eatDetails
};
