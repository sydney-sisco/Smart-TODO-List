// Imports the Google Cloud client library
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const categories = {}

const naturalLangCategorize = function (text) {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  return client.classifyText({document})
  .then(classification => classification[0].categories[0])
  .catch(err => console.log('natural-lang-api failed', err.message))
}

module.exports = {
  naturalLangCategorize
}

// categorize('A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas.')






