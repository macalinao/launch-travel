'use strict';

const fs = require('fs');
const data = require('../data/expedia.json');

const activities = data.activities;
activities.forEach(activity => {
  console.log(`Writing ${activity.id}`);
  const activityFile = `${activity.id}.txt`;
  fs.writeFileSync(
    `${__dirname}/../data/activities/${activityFile}`,
    activity.descriptionLong
  );
});
