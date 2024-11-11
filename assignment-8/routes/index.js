//Here you will import route files and export them as used in previous labs
import moviesRoutes from './movies.js';
const constructorMethod = (app) => {
  app.use('/', moviesRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Error : Route Not found'});
  });
};

export default constructorMethod;