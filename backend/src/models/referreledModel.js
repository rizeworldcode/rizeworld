const mongoose = require("mongoose");

const referredSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: null,
  },
  total_student: {
    type: Number,
    default: 0,
  },
  amount: {
    total: {
      type: String,
      default: "",
    },
    pending: {
      type: String,
      default: "",
    },
    paid: {
      type: String,
      default: "",
    },
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const referred = mongoose.model("referred", referredSchema);
module.exports = referred;
