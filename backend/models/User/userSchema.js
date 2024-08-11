const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, 
  },
  
  name: {
    type: String,
    required: true, 
  },
  
  username: {
    type: String,
    required: true, 
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true, 
  },

  phoneNumber: {
    type: String, 
    required: true,
  },

  ProfilePicture: {
    type: String, 
    required: true, 
  },

  CoverPicture: {
    type: String, 
    required: true, 
  },

  Gender: {
    type: String,
    required: true, 
  },

  Nationnality: {
    type: String,
    required: true, 
  },

  address: {
    type: String,
    required: true, 
  },
});

module.exports = mongoose.model('User', userSchema);
