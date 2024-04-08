const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  coverPhoto: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  baths: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  sqSize: {
    type: Number,
    required: true
  },
  externalID: {
    type: String,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coverVideo: {
    type: String
  },
  panorama: {
    type: String
  },
  amenities: {
    type: [String]
  },
  furshied: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

})

module.exports = mongoose.model('Property', propertySchema)