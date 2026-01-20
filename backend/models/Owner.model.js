import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
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
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminSubscription"
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

export default mongoose.model("Owner", ownerSchema);