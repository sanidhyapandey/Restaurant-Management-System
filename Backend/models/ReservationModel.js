const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONSTANTS = require("../constants");

const ReservationsSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: CONSTANTS.MODELS.USERSMODEL,
  },
  table_id: {
      // type: Schema.Types.ObjectId,
      // ref: CONSTANTS.MODELS.DINER_TABLEMODEL
      type: String
  },
  no_of_guests: {
      type: Number
  },
  res_status: {
      type: String
  },
  type: {
    type: String,
    enum: [CONSTANTS.ORDER_TYPE.PICKUP, CONSTANTS.ORDER_TYPE.DELIVERY],
    default: CONSTANTS.ORDER_TYPE.DELIVERY,
  },
  res_time: {
      type: Date
  },
  active: {
      type: Boolean,
      default : true
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
},
{ timestamps: true });

const Reservations = mongoose.model("Reservations", ReservationsSchema);
module.exports = Reservations;