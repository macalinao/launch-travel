const expedia = require('../lib/expedia');

expedia.
  nlpSearch('bangkok safe hotels').
  then(result => {a
    console.log(result.body);
  }).
  catch(error => {
    console.error(error.message);
    console.error(error);
  });
