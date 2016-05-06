'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Match = mongoose.model('Match'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, match;

/**
 * Match routes tests
 */
describe('Match CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Match
    user.save(function () {
      match = {
        name: 'Match name'
      };

      done();
    });
  });

  it('should be able to save a Match if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Match
        agent.post('/api/matches')
          .send(match)
          .expect(200)
          .end(function (matchSaveErr, matchSaveRes) {
            // Handle Match save error
            if (matchSaveErr) {
              return done(matchSaveErr);
            }

            // Get a list of Matches
            agent.get('/api/matches')
              .end(function (matchsGetErr, matchsGetRes) {
                // Handle Match save error
                if (matchsGetErr) {
                  return done(matchsGetErr);
                }

                // Get Matches list
                var matches = matchsGetRes.body;

                // Set assertions
                (matches[0].user._id).should.equal(userId);
                (matches[0].name).should.match('Match name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Match if not logged in', function (done) {
    agent.post('/api/matches')
      .send(match)
      .expect(403)
      .end(function (matchSaveErr, matchSaveRes) {
        // Call the assertion callback
        done(matchSaveErr);
      });
  });

  it('should not be able to save an Match if no name is provided', function (done) {
    // Invalidate name field
    match.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Match
        agent.post('/api/matches')
          .send(match)
          .expect(400)
          .end(function (matchSaveErr, matchSaveRes) {
            // Set message assertion
            (matchSaveRes.body.message).should.match('Please fill Match name');

            // Handle Match save error
            done(matchSaveErr);
          });
      });
  });

  it('should be able to update an Match if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Match
        agent.post('/api/matches')
          .send(match)
          .expect(200)
          .end(function (matchSaveErr, matchSaveRes) {
            // Handle Match save error
            if (matchSaveErr) {
              return done(matchSaveErr);
            }

            // Update Match name
            match.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Match
            agent.put('/api/matches/' + matchSaveRes.body._id)
              .send(match)
              .expect(200)
              .end(function (matchUpdateErr, matchUpdateRes) {
                // Handle Match update error
                if (matchUpdateErr) {
                  return done(matchUpdateErr);
                }

                // Set assertions
                (matchUpdateRes.body._id).should.equal(matchSaveRes.body._id);
                (matchUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Matches if not signed in', function (done) {
    // Create new Match model instance
    var matchObj = new Match(match);

    // Save the match
    matchObj.save(function () {
      // Request Matches
      request(app).get('/api/matches')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Match if not signed in', function (done) {
    // Create new Match model instance
    var matchObj = new Match(match);

    // Save the Match
    matchObj.save(function () {
      request(app).get('/api/matches/' + matchObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', match.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Match with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/matches/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Match is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Match which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Match
    request(app).get('/api/matches/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Match with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Match if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Match
        agent.post('/api/matches')
          .send(match)
          .expect(200)
          .end(function (matchSaveErr, matchSaveRes) {
            // Handle Match save error
            if (matchSaveErr) {
              return done(matchSaveErr);
            }

            // Delete an existing Match
            agent.delete('/api/matches/' + matchSaveRes.body._id)
              .send(match)
              .expect(200)
              .end(function (matchDeleteErr, matchDeleteRes) {
                // Handle match error error
                if (matchDeleteErr) {
                  return done(matchDeleteErr);
                }

                // Set assertions
                (matchDeleteRes.body._id).should.equal(matchSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Match if not signed in', function (done) {
    // Set Match user
    match.user = user;

    // Create new Match model instance
    var matchObj = new Match(match);

    // Save the Match
    matchObj.save(function () {
      // Try deleting Match
      request(app).delete('/api/matches/' + matchObj._id)
        .expect(403)
        .end(function (matchDeleteErr, matchDeleteRes) {
          // Set message assertion
          (matchDeleteRes.body.message).should.match('User is not authorized');

          // Handle Match error error
          done(matchDeleteErr);
        });

    });
  });

  it('should be able to get a single Match that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Match
          agent.post('/api/matches')
            .send(match)
            .expect(200)
            .end(function (matchSaveErr, matchSaveRes) {
              // Handle Match save error
              if (matchSaveErr) {
                return done(matchSaveErr);
              }

              // Set assertions on new Match
              (matchSaveRes.body.name).should.equal(match.name);
              should.exist(matchSaveRes.body.user);
              should.equal(matchSaveRes.body.user._id, orphanId);

              // force the Match to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Match
                    agent.get('/api/matches/' + matchSaveRes.body._id)
                      .expect(200)
                      .end(function (matchInfoErr, matchInfoRes) {
                        // Handle Match error
                        if (matchInfoErr) {
                          return done(matchInfoErr);
                        }

                        // Set assertions
                        (matchInfoRes.body._id).should.equal(matchSaveRes.body._id);
                        (matchInfoRes.body.name).should.equal(match.name);
                        should.equal(matchInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Match.remove().exec(done);
    });
  });
});
