const axios = require('axios');

const readDetails = query => {
  const testingStr = query.split(' ').join('+');
  const apiUrlRequest = `https://www.googleapis.com/books/v1/volumes?q=${testingStr}`;
  return axios.get(apiUrlRequest).then(res => {
    const bookInfo = res.data.items[0].volumeInfo;
    return {
      title: bookInfo.title,
      subtitle: bookInfo.subtitle,
      authors: bookInfo.authors,
      year: bookInfo.publishedDate,
      categories: bookInfo.categories,
      thumbnail: bookInfo.imageLinks.thumbnail,
      link: bookInfo.previewLink
    }
  })
};

module.exports = { readDetails };
