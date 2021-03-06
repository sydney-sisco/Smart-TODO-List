let testingStr = 'hdmi';
testingStr = testingStr.split(' ').join('+');

const apiUrlRequest = `https://api.wolframalpha.com/v2/query?input=${testingStr}&format=plaintext&output=JSON&appid=3KJG9G-7KJ94PHXV6`;

const axios = require('axios');

axios.get(apiUrlRequest).then(res => {
  let wordArr = [];
  let category = '';
  let assumptionsVar = res.data.queryresult.assumptions;
  // console.log(res.data.queryresult);
  Array.isArray(assumptionsVar) ? assumptionsVar = assumptionsVar[0].values : assumptionsVar = assumptionsVar.values;
  const buyArr = ['product', 'unit', 'invention', 'device'];
  const watchArr = ['movie', 'serie'];
  const eatArr = ['food', 'nutrition'];
  const readArr = ['book'];

  for (const elem of assumptionsVar) {
    wordArr.push(elem.desc);
    if (buyArr.some(arrElem => elem.desc.indexOf(arrElem) !== -1)) {
      category = 'To Buy';
      break;
    }
    if (watchArr.some(arrElem => elem.desc.indexOf(arrElem) !== -1)) {
      category = 'To Watch';
      break;
    }
    if (eatArr.some(arrElem => elem.desc.indexOf(arrElem) !== -1)) {
      category = 'To Eat';
      break;
    }
    if (readArr.some(arrElem => elem.desc.indexOf(arrElem) !== -1)) {
      category = 'To Read';
      break;
    }
  }
  if (!category) category = 'Uncategorized';
  console.log(wordArr);
  console.log(category);
}).catch(err => console.log(err));
