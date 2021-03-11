// a dumb hack to get google credentials working on heroku
if(process.env.ENV === 'PROD') {
  // get the credentials from env variable
  const googleKeyFileContents = process.env.GOOGLE_KEY;

  // write it to a file
  const fs = require('fs');
  try {
    const data = fs.writeFileSync('/tmp/google-key.json', googleKeyFileContents);
  } catch (err) {
    console.error(err);
  }
}

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
