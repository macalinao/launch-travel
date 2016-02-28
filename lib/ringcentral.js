const APP_KEY = process.env.RINGCENTRAL_APP_KEY;
const APP_SECRET = process.env.RINGCENTRAL_APP_SECRET;
const NUMBER = process.env.RINGCENTRAL_NUMBER;

const MESSAGE_STORE = '/account/~/extension/~/message-store';

const Promise = require('bluebird');
const Ringcentral = require('ringcentral');
const sdk = new Ringcentral({
  server: 'https://platform.devtest.ringcentral.com', // SANDBOX
  appKey: APP_KEY,
  appSecret: APP_SECRET
});

const platform = sdk.platform();

function login() {
  return platform.login({
    username: NUMBER,
    extension: '',
    password: 'P@ssw0rd'
  }).then(x => x._json);
}

function messages() {
  return platform.
    get(MESSAGE_STORE).
    then(x => x.json().records);
}

function sms(to, msg) {
  return platform.
    post('/account/~/extension/~/sms', {
      from: {
        phoneNumber: NUMBER
      },
      to: [{
        phoneNumber: to
      }],
      text: msg
    });
}

function makeSubscription() {
  return sdk.createSubscription();
}

function listenToSMS(handler) {
  const subscription = makeSubscription();
  subscription.on(subscription.events.notification, handler);
  return subscription
    .setEventFilters([MESSAGE_STORE]) // a list of server-side events
    .register();
}

module.exports = {
  MESSAGE_STORE: MESSAGE_STORE,
  listenToSMS: listenToSMS,
  login: login,
  makeSubscription: makeSubscription,
  messages: messages,
  sms: sms
};
