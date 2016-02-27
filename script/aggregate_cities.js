const fs = require('fs');

const CITIES_DIR = `${__dirname}/../data/cities`;
const ANALYSIS_DIR = `${__dirname}/../data/cities-analysis`;

const files = fs.readdirSync(ANALYSIS_DIR);

const result = {};

files.forEach(file => {
  const txt = file.substring(0, file.length - '.json'.length);
  const orig = fs.readFileSync(`${CITIES_DIR}/${txt}`).toString();
  const city = orig.split('\n')[0];
  const f = fs.readFileSync(`${ANALYSIS_DIR}/${file}`);
  const body = JSON.parse(f.toString());
  const big5 = body.tree.children[0].children[0].children;
  const stats = {};
  big5.forEach(el => {
    stats[el.id] = el.percentage;
  });
  result[city] = stats;
});

const str = JSON.stringify(result);
fs.writeFileSync(`${__dirname}/../data/cities_analysis.json`, str);
