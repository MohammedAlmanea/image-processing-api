import express from 'express';
import process from './api/process';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the main page');
});

routes.use('/process', process);

export default routes;