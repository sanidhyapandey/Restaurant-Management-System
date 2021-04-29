const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
      type: Number
  },
  quantity: {
      type: Number
  }
});

const Items = mongoose.model("Items", ItemsSchema);
module.exports = Items;