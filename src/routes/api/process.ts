import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const process = express.Router();

process.get('/', async (req:express.Request, res:express.Response) => {
  const width:number = parseInt(req.query.width as string);
  const height:number = parseInt(req.query.height as string);
  const imageName:string = req.query.imageName as string;
  if(fs.existsSync(`./images/cache/${imageName}-${width}-${height}.png`))
    {
      res.sendFile(`${path.resolve('./')}/images/cache/${imageName}-${width}-${height}.png`)
    }
    else{
  const processImage = await sharp(`./images/${imageName}.jpg`)
  .resize(width,height)
    .png()
    .toBuffer()

    res.sendFile(`${path.resolve('./')}/images/cache/${imageName}-${width}-${height}.png`)
      fs.writeFile(`./images/cache/${imageName}-${width}-${height}.png`,processImage,(err) =>{
      if(err)
      console.log(`saving file failed: ${err}`);
    })
  }
});

export default process;