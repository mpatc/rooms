'use strict';

/**
 * Module dependencies
 */
var matchesPolicy = require('../policies/matches.server.policy'),
  matches = require('../controllers/matches.server.controller');

module.exports = function(app) {
  // Matches Routes
  app.route('/api/matches').all(matchesPolicy.isAllowed)
    .get(matches.list)
    .post(matches.create);

  app.route('/api/matches/:matchId').all(matchesPolicy.isAllowed)
    .get(matches.read)
    .put(matches.update)
    .delete(matches.delete);

    // Finish by binding the Match middleware
  app.param('matchId', matches.matchByID);
};
