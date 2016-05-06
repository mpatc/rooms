'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Room Schema
 */
var RoomSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Room name',
    trim: true
  },
  when: {
    type: String,
    default: '',
    required: 'Please fill Room when',
    trim: true
  },
  rent: {
    type: String,
    default: '',
    required: 'Please fill Room rent',
    trim: true
  },
  util: {
    type: String,
    default: '',
    required: 'Please fill Room utilities',
    trim: true
  },
  other: {
    type: String,
    default: '',
    required: 'Please fill Room other',
    trim: true
  },
  client: {
    type: Schema.ObjectId,
    ref: 'Client'
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

mongoose.model('Room', RoomSchema);
