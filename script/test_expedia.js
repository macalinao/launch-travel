const expedia = require('../lib/expedia');

expedia.
  cityInfo('San Francisco').
  then(result => {
    console.log(JSON.stringify(result));
  }).
  catch(error => {
    console.error(error.message);
    console.error(error);
  });
