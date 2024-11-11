//An index file that returns a function that attaches all your routes to your app
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/routes/index.js

import peopleDataFunctions from './people.js';
import companiesDataFunctions from './companies.js';

const constructorMethod = (app) => {
  app.use('/people', peopleDataFunctions);
  app.use('/companies', companiesDataFunctions);

  app.use('*', (req, res) => {
    return res.status(404).json({error: 'Not found'});
  });
};

export default constructorMethod;