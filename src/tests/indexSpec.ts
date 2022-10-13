import { response } from 'express';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/main');
    // 200 is http code for OK
    expect(response.status).toEqual(200);
  });
});
