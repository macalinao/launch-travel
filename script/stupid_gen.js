'use strict';

const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/../data/stupid.txt`).toString();

const lines = data.split('\n').filter(l => l);

const cities = [];

let current = {};

while (lines.length > 0) {
  const next = lines.shift();
  const parts = next.split(': ');
  if (current.length === 0 || (parts.length === 2 && parts[0].length === 2)) {
    current = {
      city: next.split(': ')[1],
      content: ''
    };
    cities.push(current);
  } else {
    current.content = (current.content + ' ' + next).trim();
  }
}

cities.forEach(city => {
  console.log(`Writing ${city.city}`);
  const cityFile = city.city.toLowerCase().split(' ').join('-') + '.txt';
  fs.writeFileSync(
    `${__dirname}/../data/cities/${cityFile}`,
    city.city + '\n' + city.content
  );
});
