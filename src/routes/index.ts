import express, { Router } from 'express';
import process from './process/process';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the main page');
});

routes.use('/process', process);

export default routes;