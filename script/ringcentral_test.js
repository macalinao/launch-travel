const ringcentral = require('../lib/ringcentral');
const data = require('../data/expedia.json');
const hotel = data.hotel;

const NUMBER = '+15107368436';

ringcentral.login().
  then(() => {
    return ringcentral.sms(NUMBER, 'Your hotel price has dropped to $123.24 per night. Book now?');
  }).
  then(() => {
    return ringcentral.listenToSMS(function(msg) {
      ringcentral.messages().then(msgs => {
        console.log('if young metro dont trust you imma shoot you');
        return msgs[0].subject;
      }).then(txt => {
        if (txt.startsWith('Ok, book your hotel')) return null;
        console.log(txt);
        return ringcentral.sms(NUMBER, `Ok, book your hotel at ${hotel.link}`);
      }).catch(console.error);
    });
  }).
  then(() => {
    console.log('Registered SMS subscription');
  }).
  catch(error => {
    console.log(error);
  });
