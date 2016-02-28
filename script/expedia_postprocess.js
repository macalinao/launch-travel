const fs = require('fs');
const data = require('../data/expedia.json');

const ANALYSIS_DIR = `${__dirname}/../data/activities-analysis`;

const files = fs.readdirSync(ANALYSIS_DIR);

const ids = {};

files.forEach(file => {
  const f = require(`${ANALYSIS_DIR}/${file}`);
  const big5 = f.tree.children[0].children[0].children;
  const stats = {};
  big5.forEach(el => {
    stats[el.id] = el.percentage;
  });
  ids[file.substring(0, file.length - '.txt.json'.length)] = stats;
});

console.log(ids);

const str = JSON.string(data, null, 2);
fs.writeFileSync(`${__dirname}/../data/expedia_full.json`);
