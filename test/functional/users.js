/*jshint -W030 */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

const
  request = require('supertest'),
  should = require('should'),
  app = require('../../server'),
  db = require('../utils/db'),
  users = require('../fixtures/users.json'),
  user = users[0],
  admin = users[1];

describe('User-Routes', function(done) {
  before(function(done) {
    db.setupDatabase(done);
  });

  after(function(done) {
    db.endConnection(done);
  });

  describe('/users', function(done) {
    it('should forbid access for non admin users', function(done) {
      request(app)
        .get('/api/v1/users')
        .set('Authorization', 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64'))
        .expect(403)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) { throw err; }

          res.body.code.should.eql(403);
          res.body.message.should.eql('Forbidden');
          done();
        });
    });
    
    it('should return all users', function(done) {
      request(app)
        .get('/api/v1/users')
        .set('Authorization', 'Basic ' + new Buffer(admin.username + ':' + admin.password).toString('base64'))
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) { throw err; }

          res.body.should.be.an.Array;
          res.body.forEach(function(elem) {
            elem.should.have.properties('id', 'username', 'email', 'role');
          });
          done();
        });
    });
    
    it('should create user', function(done) {
      request(app)
        .post('/api/v1/users')
        .set('Authorization', 'Basic ' + new Buffer(admin.username + ':' + admin.password).toString('base64'))
        .send({
          'username': 'johndoe',
          'email': 'johndoe@example.com',
          'password': 'super_secret_password',
          'role': 'user'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect('Location', /\/users\/.*/)
        .end(function(err, res) {
          if (err) { throw err; }
          
          res.body.should.have.properties('id', 'username', 'email', 'role');
          done();
        });
    });

    it('should validate user on creation', function(done) {
      request(app)
        .post('/api/v1/users')
        .set('Authorization', 'Basic ' + new Buffer(admin.username + ':' + admin.password).toString('base64'))
        .send({
          'username': 'johndoe',
          'email': 'johndoeexample.com',
          'password': 'this',
          'role': 'not-real'
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
        .get('/api/v1/users/' + user.id)
        .set('Authorization', 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64'))
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) { throw err; }

          res.body.should.have.properties('id', 'username', 'email', 'role');
          done();
        });
    });

    it('should return 404 for a non existent user', function(done) {
      request(app)
        .get('/api/v1/users/8e989ca5-6232-4045-a5e4-398a50020871')
        .set('Authorization', 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64'))
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
        .patch('/api/v1/users/' + user.id)
        .set('Authorization', 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64'))
        .send([{
          op: 'replace',
          path: '/email',
          value: 'johndoe_the_third@example.com'
        }, {
          op: 'replace',
          path: '/username',
          value: 'johndoethethird'
        }])
        .expect(204, done);
    });
    
    it('should validate the user on update', function(done) {
      request(app)
        .patch('/api/v1/users/' + admin.id)
        .set('Authorization', 'Basic ' + new Buffer(admin.username + ':' + admin.password).toString('base64'))
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
