const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONSTANTS = require("../constants");

const OrdersSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: CONSTANTS.MODELS.USERSMODEL,
  },
  type: {
    type: String,
    enum: [CONSTANTS.ORDER_TYPE.PICKUP, CONSTANTS.ORDER_TYPE.DELIVERY],
    default: CONSTANTS.ORDER_TYPE.DELIVERY,
  },
  name: {
      type: String
  },
  price: {
      type: Number
  },
//   payment_method: {
//       type: Enumerator
//   },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: CONSTANTS.MODELS.ITEMMODEL,
    },
  ],
});

const Orders = mongoose.model("Orders", OrdersSchema);
module.exports = Orders;