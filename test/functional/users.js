/*jshint -W030 */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

const
  request = require('supertest'),
  should = require('should'),
  app = require('../../server'),
  db = require('../utils/db'),
  users = require('../fixtures/users.json'),
  foo = users[0],
  bar = users[1];

describe('User-Routes', function(done) {
  before(function(done) {
    db.setupDatabase(done);
  });

  after(function(done) {
    db.endConnection(done);
  });

  describe('/users', function(done) {
    it('should return all users', function(done) {
      request(app)
        .get('/api/v1/users')
        .set('Authorization', 'Basic ' + new Buffer(foo.username + ':' + foo.password).toString('base64'))
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) { throw err; }

          res.body.should.be.an.Array;
          res.body.forEach(function(elem) {
            elem.should.have.properties('id', 'username', 'email');
          });
          done();
        });
    });
    
    it('should create user', function(done) {
      request(app)
        .post('/api/v1/users')
        .send({
          'username': 'johndoe',
          'email': 'johndoe@example.com',
          'password': 'super_secret_password'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect('Location', /\/users\/.*/)
        .end(function(err, res) {
          if (err) { throw err; }
          
          res.body.should.have.properties('id', 'username', 'email');
          done();
        });
    });

    it('should validate user on creation', function(done) {
      request(app)
        .post('/api/v1/users')
        .send({
          'username': 'johndoe',
          'email': 'johndoeexample.com',
          'password': 'this'
        })
        .expect(500)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) { throw err; }
          
          res.body.should.have.properties('code', 'message', 'description', 'errors');
          res.body.code.should.eql(2001);
          res.body.message.should.eql('validation error');
          done();
        });
    });
  });

  describe('/users/:id', function(done) {
    it('should return the user details', function(done) {
      request(app)
        .get('/api/v1/users/' + foo.id)
        .set('Authorization', 'Basic ' + new Buffer(foo.username + ':' + foo.password).toString('base64'))
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) { throw err; }

          res.body.should.have.properties('id', 'username', 'email');
          done();
        });
    });

    it('should return 404 for a non existent user', function(done) {
      request(app)
        .get('/api/v1/users/8e989ca5-6232-4045-a5e4-398a50020871')
        .set('Authorization', 'Basic ' + new Buffer(foo.username + ':' + foo.password).toString('base64'))
        .expect(404)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) { throw err; }

          res.body.should.have.properties('code', 'description', 'errors');
          done();
        });
    });

    it('should update the current user', function(done) {
      request(app)
        .patch('/api/v1/users/' + foo.id)
        .set('Authorization', 'Basic ' + new Buffer(foo.username + ':' + foo.password).toString('base64'))
        .send([{
          op: 'replace',
          path: '/email',
          value: 'johndoe_the_third@example.com'
        }, {
          op: 'replace',
          path: '/username',
          value: 'johndoethethird'
        }, {
          op: 'replace',
          path: '/password',
          value: 'this_is_my_super_secret_password'
        }])
        .expect(204, done);
    });
    
    it('should validate the user on update', function(done) {
      request(app)
        .patch('/api/v1/users/' + bar.id)
        .set('Authorization', 'Basic ' + new Buffer(bar.username + ':' + bar.password).toString('base64'))
        .send([{
          op: 'replace',
          path: '/email',
          value: 'johndoe_the_fourthexample.com'
        }, {
          op: 'replace',
          path: '/username',
          value: 'johndoe_the_fourth'
        }])
        .expect(500)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) { throw err; }
          
          res.body.should.have.properties('code', 'message', 'description', 'errors');
          res.body.code.should.eql(2001);
          res.body.message.should.eql('validation error');
          done();
        });
    });
  });
});
