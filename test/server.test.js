const { expect } = require('chai');
const request = require('supertest');

describe('server', () => {
  var server;
  beforeEach(function () {
    server = require('../index');
  });

  afterEach(function () {
    server.close();
  });

  it('responds to /status', function testSlash(done) {
    request(server)
      .get('/status')
      .expect(200, done);
    });
});
