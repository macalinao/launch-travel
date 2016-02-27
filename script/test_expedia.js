const expedia = require('../lib/expedia');

expedia.
  nlpSearch('bangkok safe hotels').
  then(result => {
    console.log(result.body);
  }).
  catch(error => {
    console.error(error.message);
    console.error(error);
  });
