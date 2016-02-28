const fs = require('fs');

const personality = require('./personality');

const ROOT = `${__dirname}/../data`;
const PERSONALITY = `${ROOT}/predictions.json`;

const me = require(PERSONALITY);

const big5 = me.
        predictions.
        filter(el => el.trait.indexOf('BIG5_') !== -1).
        reduce((acc, el) => {
          acc[el.trait.substring('BIG5_'.length)] = el.value;
          return acc;
        }, {});

module.exports = {
  big5: big5
};
