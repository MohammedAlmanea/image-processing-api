import express from 'express';
import processImage from '../../utilities';
import fs from 'fs';
import path from 'path';

const process = express.Router();

process.get('/', async (req: express.Request, res: express.Response) => {
  // Regular Expression used to check if width or height have any letter in them
  const reqExp = /[a-zA-Z]/g;
  // Checks if height and width are positive numbers
  if (
    reqExp.test(req.query.width as string) ||
    reqExp.test(req.query.height as string) ||
    parseInt(req.query.width as string) < 0 ||
    parseInt(req.query.height as string) < 0
  ) {
    res.status(400);
    return res.send('Width and Height can only be positive numbers!');
  }

  // Query return type is undefined
  // Casting with (as string) so it can parseInt since sharp takes type number for height and width
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);
  const imageName: string = req.query.imageName as string;
  // Checks if the image entered exists
  if (!fs.existsSync(`./images/${imageName}.jpg`)) {
    res.status(404);
    return res.send('The images does not exist!');
  }
  // Caching - if image with same width,height exist
  if (fs.existsSync(`./images/cache/${imageName}-${width}-${height}.png`)) {
    return res.sendFile(
      `${path.resolve('./')}/images/cache/${imageName}-${width}-${height}.png`
    );
  } else {
    //Else call proccesImage() that processes new image with width,height entered
    await processImage(width, height, imageName);
    // Since .sendFile only takes absolute path, used path resolve
    // to get absolute path of root folder
    res.sendFile(
      `${path.resolve('./')}/images/cache/${imageName}-${width}-${height}.png`
    );
  }
});

export default process;
