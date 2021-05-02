const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },  
  pwd: {
    type: String,
    required: true,
  },   
  email: {
    type: String,
    required: true,
  },   
  mobile: {
    type: String,
    required: true,
  }
});

module.exports = User = mongoose.model('user', UserSchema);
