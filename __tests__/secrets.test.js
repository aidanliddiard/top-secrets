const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend test for secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should get all secrets', async () => {
    const res = await request(app).get('/api/v1/secrets');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      { title: 'top top top secret' },
      { title: 'shhhh' },
      { title: 'secret' },
    ]);
  });
  afterAll(() => {
    pool.end();
  });
});
