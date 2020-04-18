const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  userName: {
    type: String
  },
  mobile: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String
  },
});
module.exports = User = mongoose.model('User', UserSchema);
