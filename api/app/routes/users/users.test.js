const request = require('supertest');
const app = require('server');

describe('db endpoint', () => {
  test('GET returns connection successful', (done) => {
    return request(app)
      .get('/users/db')
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBe('Connected to database.');
        done();
      });
  });

  // test('POST returns 201 created', (done) => {
  //   return request(app)
  //     .post('/users')
  //     .send({
  //       email: 'test@test.com',
  //       password: 'test'
  //     })
  //     .end((err, res) => {
  //       expect(res.statusCode).toEqual(201);
  //       done();
  //     });
  // });

  test('GET returns all users', (done) => {
    return request(app)
      .get('/users')
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        console.log(res.body);
        done();
      });
  });

});
