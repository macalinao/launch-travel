const fs = require('fs');

const personality = require('../lib/personality');
const match = personality.match;
const score = personality.score;

const ROOT = `${__dirname}/../data`;
const CITIES = `${ROOT}/cities_analysis.json`;
const MATCH = `${ROOT}/match.json`;
const PERSONALITY = `${ROOT}/predictions.json`;

const cities = JSON.parse(fs.readFileSync(CITIES).toString());
const personality = JSON.parse(fs.readFileSync(PERSONALITY).toString());

const big5 = personality.
        predictions.
        filter(el => el.trait.indexOf('BIG5_') !== -1).
        reduce((acc, el) => {
          acc[el.trait.substring('BIG5_'.length)] = el.value;
          return acc;
        }, {});

const values = Object.keys(cities).map(city => {
  const m = match(big5, cities[city]);
  return {
    name: city,
    personality: cities[city],
    match: m,
    score: score(m)
  };
}).sort(function (a, b) {
  return b.score - a.score;
});

const res = JSON.stringify(values);
fs.writeFileSync(MATCH, res);
