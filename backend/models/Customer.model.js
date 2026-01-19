import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },
    addressId: { type: String },
    milkType: {
      type: String,
      enum: ["cow", "buffalo"],
      required: true
    },
    defaultDailyQty: { type: Number, default: 1 },
    rate: {},
    billingStartDate: { type: Date, required: true },
    lastBillingDate: { type: Date },
    nextBillingDate: { type: Date },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);