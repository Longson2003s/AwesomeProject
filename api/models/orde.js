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
});
