const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Diner_tableSchema = new mongoose.Schema({
  available_from: {
    type: Date
  },
  available_to: {
      type: Date
  },
  active: {
      type: Boolean
  },
  capacity: {
      type: Number
  },
},
{ timestamps: true });

const Diner_table = mongoose.model("Diner_table", Diner_tableSchema);
module.exports = Diner_table;