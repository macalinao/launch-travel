const APP_KEY = process.env.RINGCENTRAL_APP_KEY;
const APP_SECRET = process.env.RINGCENTRAL_APP_SECRET;
const NUMBER = process.env.RINGCENTRAL_NUMBER;

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
    get('/account/~/extension/~/message-store').
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

module.exports = {
  login: login,
  messages: messages,
  sms: sms
};
