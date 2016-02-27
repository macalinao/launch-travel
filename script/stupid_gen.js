'use strict';

const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/../data/stupid.txt`).toString();

const lines = data.split('\n').filter(l => l);

const cities = [];

let current = {};

while (lines.length > 0) {
  const next = lines.shift();
  if (current.length === 0 || next.split(': ').length === 2) {
    current = {
      city: next,
      content: ''
    };
    cities.push(current);
  } else {
    current.content = (current.content + ' ' + next).trim();
  }
}

console.log(cities);
