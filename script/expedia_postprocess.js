const fs = require('fs');
const data = require('../data/expedia.json');
const personality = require('../lib/personality');
const match = require('../lib/match');

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

data.activities = data.activities.map(activity => {
  const ratings = ids[activity.id];
  activity.ratings = ratings;
  const m = personality.match(ratings, match.big5);
  activity.matchRatings = m;
  activity.match = personality.score(m);
  activity.distanceFromHotel = +(Math.random() * 10 + 2).toFixed(2);
  return activity;
}).sort((a, b) => {
  return b.match - a.match;
}).slice(0, 10);

const str = JSON.stringify(data, null, 2);
fs.writeFileSync(`${__dirname}/../data/expedia_full.json`, str);
