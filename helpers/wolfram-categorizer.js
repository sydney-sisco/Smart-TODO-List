const axios = require('axios');

const wolframCategorize = function(query) {
  let testingStr = query;
  testingStr = testingStr.split(' ').join('+');

  const apiUrlRequest = `https://api.wolframalpha.com/v2/query?input=${testingStr}&format=plaintext&output=JSON&appid=3KJG9G-7KJ94PHXV6`;
  return axios.get(apiUrlRequest).then(res => {
    let assumptionsVar = res.data.queryresult.assumptions;
    Array.isArray(assumptionsVar) ? assumptionsVar = assumptionsVar[0].values : assumptionsVar = assumptionsVar.values;
    const buyArr = ['product', 'unit', 'invention', 'device'];
    const watchArr = ['movie', 'serie'];
    const eatArr = ['food', 'nutrition'];
    const readArr = ['book'];
    console.log(assumptionsVar);
    for (const elem of assumptionsVar) {
      if (watchArr.some(arrElem => elem.desc.indexOf(arrElem) !== -1)) return 1;
      if (eatArr.some(arrElem => elem.desc.indexOf(arrElem) !== -1)) return 2;
      if (readArr.some(arrElem => elem.desc.indexOf(arrElem) !== -1)) return  3;
      if (buyArr.some(arrElem => elem.desc.indexOf(arrElem) !== -1)) return 4;
    }
    return 5;
  }).catch(err => {
    console.log(err);
    return 5;
  });

};

module.exports = {
  wolframCategorize
};
