import processImage from '../utilities';

describe('processImage tests', () => {
    it('promise be resolved', async () => { 
      expect(await processImage(200,400,'fjord')).toBeResolved;
    });
});