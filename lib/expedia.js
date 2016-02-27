const co = require('co');
const faker = require('faker');
const request = require('superagent-bluebird-promise');

const API_KEY = process.env.EXPEDIA_API_KEY;
const BASE_URL = 'http://terminal2.expedia.com/x/';

function nlpSearch(query) {
  return request.
    get(`${BASE_URL}nlp/results`).
    query({
      q: query,
      apikey: API_KEY
    }).
    promise();
}

function activities(location) {
  return request.
    get(`${BASE_URL}activities/search`).
    query({
      location: location,
      apikey: API_KEY
    }).
    promise();
}

function activityDetails(activityId) {
  return request.
    get(`${BASE_URL}activities/details`).
    query({
      activityId: activityId,
      apikey: API_KEY
    }).
    promise();
}

function hotels(location, radius) {
  radius = radius || '50km';
  return request.
    get(`${BASE_URL}hotels`).
    query({
      location: location,
      radius: radius,
      apikey: API_KEY
    }).
    promise();
}

const cityInfo = co.wrap(function* cityInfo(location) {
  const activitiesResp = yield activities(location);
  const acts = activitiesResp.body.activities.slice(0, 5);
  const loc = acts[0].latLng;

  const hotelsResp = yield hotels(loc);
  const hot = hotelsResp.body.HotelInfoList.HotelInfo;

  const myHot = hot[0];

  return {
    hotel: myHot,
    activities: acts.map(act => ({
      name: act.title,
      distanceFromHotel: 0.7,
      address: act.latLng,
      price: act.fromPrice,
      match: 85,
      rating: act.recommendationScore / 20,
      ratingName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      ratingDescription: `I love ${act.title}. It is an amazing place!`,
      description: act.description,
      bookWebsite: `http://www.expedia.com/activities/${act.id}`
    }))
  };
});

module.exports = {
  nlpSearch: nlpSearch,
  activities: activities,
  hotels: hotels,
  cityInfo: cityInfo
};
