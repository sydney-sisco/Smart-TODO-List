// const { getWatchDetails } = require('./the-movie-database-api');
const { getWatchDetails } = require('./the-imdb-api');
const { getEatDetails } = require('./eat-placeholder');
const { getReadDetails } = require('./read-placeholder');
const { getBuyDetails } = require('./buy-placeholder');


const getItemDetails = (itemData) => {

  // determine which helper to use based on item category
  switch (itemData.category_id) {
    case 1:
      return getWatchDetails(itemData);
    case 2:
      return getEatDetails(itemData);
    case 3:
      return getReadDetails(itemData);
    case 4:
      return getBuyDetails(itemData);
    default:
      itemData.details = null;
      return itemData;
  }
};

module.exports = { getItemDetails };
