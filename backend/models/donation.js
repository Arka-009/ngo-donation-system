const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["SUCCESS", "PENDING", "FAILED"],
      default: "PENDING"
    },
    paymentId: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
