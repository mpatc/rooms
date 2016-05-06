'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Client Schema
 */
var ClientSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Client name',
    trim: true
  },
  email: {
    type: String,
    default: '',
    required: 'Please fill Client email',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    required: 'Please fill in Client phone',
    trim: true
  },
  other: {
    type: String,
    default: '',
    required: 'Please fill in Client other',
    trim: true
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

mongoose.model('Client', ClientSchema);
