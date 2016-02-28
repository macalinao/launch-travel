const ringcentral = require('../lib/ringcentral');

ringcentral.login().
  then(result => {
    // return ringcentral.sms('+15107368436', 'Fares changed from $123.43 to $110.25. Act now!');
    return ringcentral.messages();
  }).
  then(result => {
    console.log(result.map(x => x.subject));
  }).
  catch(error => {
    console.log(error);
  });
