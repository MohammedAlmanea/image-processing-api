import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the main page');
});

export default routes;