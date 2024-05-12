const mongoose = require("mongoose");
const { STATUS } = require("../config/orderStatus");
 

const OrderSchema = mongoose.Schema(
    {
      productId: {
        type: String,
        required: true,
      },
      customerId:{
        type: String,
        required: true,
      },
      trackNo:{
        type:String,
        require: false,
      },
      customerAddress:{
        type: String,
        required: true,
      },
      paymentType:{
        type: String,
        required: true,
      }, 
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
        default: 0.0,
      },

      status:{
        type: String,
        default: "Pending",
        enum: [STATUS.Pending, STATUS.Processing, STATUS.Confirmed, STATUS.Onhold, STATUS.Shipped, STATUS.Delivered, STATUS.Cancelled, STATUS.Refunded, STATUS.Returned, STATUS.Completed, STATUS.Failed]
      }
      
    },
    {
      timestamps: true,
    }
  );
  

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
