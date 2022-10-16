import sharp from 'sharp';
import fs from 'fs';

const processImage = async (
  width: number,
  height: number,
  imageName: string
) => {
  const img = await sharp(`./images/${imageName}.jpg`)
    .resize(width, height)
    .png()
    .toBuffer();

  // Saving new image in cache
  fs.writeFileSync(`./images/cache/${imageName}-${width}-${height}.png`, img);
};

export default processImage;
