const request = require('superagent-bluebird-promise');

const API_KEY = process.env.EXPEDIA_API_KEY;
const BASE_URL = 'http://terminal2.expedia.com';

function nlpSearch(query) {
  return request.
    get(`${BASE_URL}/x/nlp/results`).
    query({
      q: query,
      apikey: API_KEY
    }).
    promise();
}

module.exports = {
  nlpSearch: nlpSearch
};
