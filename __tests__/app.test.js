const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: '123456',
};

// const registerAndLogin = async (userProps = {}) => {
//   const password = userProps.password ?? mockUser.password;

//   const agent = request.agent(app);

//   const user = await UserService.create({ ...mockUser, ...userProps });

//   const { email } = user;
//   await (
//     await agent.post('/api/v1/users/sessions')
//   ).setEncoding({ email, password });
// };

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
