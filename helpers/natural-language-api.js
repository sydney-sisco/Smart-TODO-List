// set up google key file
const googleKeyFileContents = process.env.GOOGLE_KEY;
// TODO: remove log
console.log('google key file contents:',googleKeyFileContents);



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








// const {auth} = require('google-auth-library');

// // load the environment variable with our keys
// const keysEnvVar = process.env.GOOGLE_KEY;
// if (!keysEnvVar) {
//   throw new Error('The $GOOGLE_KEY environment variable was not found!');
// }
// const keys = JSON.parse(keysEnvVar);

// async function main() {
//   // load the JWT or UserRefreshClient from the keys
//   const client = auth.fromJSON(keys);
//   client.scopes = ['https://www.googleapis.com/auth/cloud-platform'];
//   const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
//   const res = await client.request({url});
//   console.log(res.data);
// }

// main().catch(console.error);
