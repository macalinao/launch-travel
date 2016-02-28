const expedia = require('../lib/expedia');

expedia.
  cityInfo('New York').
  then(result => {
    console.log(JSON.stringify(result, null, 2));
  }).
  catch(error => {
    console.error(error.message);
    console.error(error);
  });
