'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Match = mongoose.model('Match'),
  Room = mongoose.model('Room'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Match
 */
exports.create = function(req, res) {
  console.log("req: ", req);
  var match = new Match(req.body);
  match.user = req.user;

  match.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(match);
    }
  });
};

/**
 * Show the current Match
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var match = req.match ? req.match.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  match.isCurrentUserOwner = req.user && match.user && match.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(match);
};

/**
 * Update a Match
 */
exports.update = function(req, res) {
  var match = req.match ;

  match = _.extend(match , req.body);

  match.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(match);
    }
  });
};

/**
 * Delete an Match
 */
exports.delete = function(req, res) {
  var match = req.match ;

  match.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(match);
    }
  });
};

/**
 * List of Matches
 */
exports.list = function(req, res) {
  Match.find().sort('-created').populate('user room').exec(function(err, matches) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(matches);
    }
  });
};

/**
 * Match middleware
 */
exports.matchByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Match is invalid'
    });
  }

  Match.findById(id).populate('user', 'displayName').exec(function (err, match) {
    if (err) {
      return next(err);
    } else if (!match) {
      return res.status(404).send({
        message: 'No Match with that identifier has been found'
      });
    }
    req.match = match;
    next();
  });
};
