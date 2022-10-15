import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets main endpoint', async () => {
    const response = await request.get('/main');
    // 200 is http code for OK
    expect(response.status).toEqual(200);
  });
  it('gets process endpoint', async () => {
    // 200 is http code for OK
    const response = await request.get(
      '/main/process?height=400&width=300&imageName=fjord'
    );
    expect(response.status).toEqual(200);
  });
});

describe('Height, Width, fileName  responses', () => {
  it('gets success if height and width and imageName are valid', async () => {
    const response = await request.get(
      '/main/process?height=400&width=300&imageName=fjord'
    );

    expect(response.status).toEqual(200);
  });
  it('gets error if height is missing', async () => {
    const response = await request.get(
      '/main/process?width=300&imageName=fjord'
    );
    expect(response.status).not.toEqual(200);
  });
  it('gets error if width is missing', async () => {
    const response = await request.get(
      '/main/process?height=300&imageName=fjord'
    );
    expect(response.status).not.toEqual(200);
  });
  it('gets error if imageName is not valid', async () => {
    const response = await request.get(
      '/main/process?height=300&width=300&imageName=helloWorld'
    );
    expect(response.status).toEqual(404);
  });
  it('gets error if height is negative number', async () => {
    const response = await request.get(
      '/main/process?height=-200&width=300&imageName=fjord'
    );
    expect(response.status).toEqual(400);
  });
  it('gets error if width is negative number', async () => {
    const response = await request.get(
      '/main/process?height=200&width=-300&imageName=fjord'
    );
    expect(response.status).toEqual(400);
  });
});
