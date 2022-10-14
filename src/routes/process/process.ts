import express from 'express';

const process = express.Router();

process.get('/', (req, res) => {
  res.send('connected to process');
});

export default process;