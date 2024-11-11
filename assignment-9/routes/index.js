import textDecoderRoutes from './textdecoder.js';

const constructorMethod = (app) => {
  app.use('/', textDecoderRoutes);

  app.use('*', (req, res) => {
    return res.status(404).json({error: 'Error : Page Not found'});
  });
};

export default constructorMethod;