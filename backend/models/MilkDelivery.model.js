import mongoose from "mongoose";

const milkDeliverySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller"
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    milkType: {
      type: String,
      enum: ["cow", "buffalo"],
      required: true
    },

    milkQty: { type: Number, required: true },
    ratePerLiter: { type: Number, required: true },

    delivered: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("MilkDelivery", milkDeliverySchema);
