import mongoose from "mongoose";

const milkRateSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },

    milkType: {
      type: String,
      enum: ["cow", "buffalo"],
      required: true
    },

    ratePerLiter: { type: Number, required: true },
    effectiveFrom: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("MilkRate", milkRateSchema);
