import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const process = express.Router();

process.get('/', async (req: express.Request, res: express.Response) => {
  const reqExp = /[a-zA-Z]/g;
  if (
    reqExp.test(req.query.width as string) ||
    reqExp.test(req.query.height as string) ||
    parseInt(req.query.width as string) < 0 ||
    parseInt(req.query.height as string) < 0
  ) {
    res.status(400);
    return res.send('Width and Height can only be positive numbers!');
  }
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);
  const imageName: string = req.query.imageName as string;
  if (!fs.existsSync(`./images/${imageName}.jpg`)) {
    res.status(404);
    return res.send('The images does not exist!');
  }
  if (fs.existsSync(`./images/cache/${imageName}-${width}-${height}.png`)) {
    res.sendFile(
      `${path.resolve('./')}/images/cache/${imageName}-${width}-${height}.png`
    );
  } else {
    const processImage = await sharp(`./images/${imageName}.jpg`)
      .resize(width, height)
      .png()
      .toBuffer();

    fs.writeFile(
      `./images/cache/${imageName}-${width}-${height}.png`,
      processImage,
      (err) => {
        if (err) {
          console.log(`saving file failed: ${err}`);
        }
        res.sendFile(
          `${path.resolve(
            './'
          )}/images/cache/${imageName}-${width}-${height}.png`
        );
      }
    );
  }
});

export default process;
