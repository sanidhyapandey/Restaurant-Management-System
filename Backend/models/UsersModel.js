const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONSTANTS = require("../constants");
const jwt = require('jsonwebtoken');

const UsersSchema = new mongoose.Schema({
  name: {
    type: String
  },

  email: {
    type: String
  },

  address: {
    type: String
  },
  password: {
    type: String
  },
  user_type: {
    type: String,
    enum: [CONSTANTS.USER_TYPE.USER, CONSTANTS.USER_TYPE.MANAGER],
    default: CONSTANTS.USER_TYPE.USER
  }
});

const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;