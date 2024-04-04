const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true
  },

  address: {
    type: String,
    require: true
  },
  
  name: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('User', userSchema)