const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },     
  password: {
    type: String,
    required: true,
  },   
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },  
  mobile: {
    type: String,
    required: true,
  },   
  alias: {
    type: String,
    required: true,
  }
});

module.exports = User = mongoose.model('user.v2', UserSchema);
