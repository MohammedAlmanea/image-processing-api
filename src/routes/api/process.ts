import express from 'express';
import sharp from 'sharp';

const process = express.Router();

process.get('/', async (req:express.Request, res:express.Response) => {
  res.send('connected to process');
  let width:number = req.query.width as unknown as number;
  let height:number = req.query.height as unknown as number;
  let imageName:string = req.query.imageName as string;
 
});

export default process;