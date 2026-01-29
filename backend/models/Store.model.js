const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    shopName: {
      type: String,
      required: true,
      trim: true
    },

    shopAddress: {
      type: String,
      trim: true
    },

    contactNumber: {
      type: String,
      trim: true
    },

    milkTypes: [
      {
        type: String,
        enum: ["cow", "buffalo"]
      }
    ],

    defaultMilkRate: {
      type: Number,
      min: 0
    },

    // Active subscription reference
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true
    },
    paymentGateway: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay"
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    amount: {
      type: Number,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },

    isSuspended: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
const Store = mongoose.model("Store", storeSchema)
module.exports = Store