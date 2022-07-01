const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('backend test for secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const mockUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@defense.gov',
    password: '123456',
  };

  const registerAndLogin = async (userProps = {}) => {
    const password = userProps.password ?? mockUser.password;

    const agent = request.agent(app);

    const user = await UserService.create({ ...mockUser, ...userProps });

    const { email } = user;
    await agent.post('/api/v1/users/sessions').send({ email, password });
    return [agent, user];
  };

  it('should get all secrets', async () => {
    const res = await request(app).get('/api/v1/secrets');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      { title: 'top top top secret' },
      { title: 'shhhh' },
      { title: 'secret' },
    ]);
  });
  it('should allow signed in users to create secret', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.post('/api/v1/secrets').send({
      title: 'not a secret',
      description: 'jk it is a secret did i fool you?',
    });

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: '4',
      title: 'not a secret',
      description: 'jk it is a secret did i fool you?',
    });
  });
  afterAll(() => {
    pool.end();
  });
});
