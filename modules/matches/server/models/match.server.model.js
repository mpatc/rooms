'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Match Schema
 */
var MatchSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Match name',
    trim: true
  },
  client: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
  room: {
    type: Schema.ObjectId,
    ref: 'Room'
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Match', MatchSchema);
