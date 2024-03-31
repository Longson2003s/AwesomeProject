const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: [
    {
      name: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        require: true,
      },

      price: {
        type: Number,
        require: true,
      },

      Image: {
        type: String,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    houseNo: {
      type: String,
      required: true,
    },
    stress: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});



const Order = mongoose.model("Order",orderSchema);

module.exports = Order;