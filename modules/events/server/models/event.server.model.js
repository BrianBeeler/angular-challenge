'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  startDate: {
    type: Date,
    default: '',
    required: 'Start and End Date must be selected'
  },
  endDate: {
    type: Date,
    default: '',
    required: 'Start and End Date must be selected'
  },
  category: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  featured: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});


mongoose.model('Event', EventSchema);
