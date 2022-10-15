import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets main endpoint', async () => {
    const response = await request.get('/main');
    // 200 is http code for OK
    expect(response.status).toEqual(200);
  });
  it('gets process endpoint', async () =>{
    const response = await request.get('/main/process?height=400&width=300&imageName=fjord');
    expect(response.status).toEqual(200);
  })
});

describe('Height, Width, fileName  responses', () => {
  it('if height and width and imageName are valid', async () => {
    const response = await request.get('/main/process?height=400&width=300&imageName=fjord');
    // 200 is http code for OK
    expect(response.status).toEqual(200);
  });
  it('gets error if height is missing', async () =>{
    const response = await request.get('/main/process?width=300&imageName=fjord');
    expect(response.status).not.toEqual(200);
  });
  it('gets error if width is missing', async () =>{
    const response = await request.get('/main/process?height=300&imageName=fjord');
    expect(response.status).not.toEqual(200);
  });
});
