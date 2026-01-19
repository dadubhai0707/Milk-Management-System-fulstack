import mongoose from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    shopName: { type: String, required: true },
    shopAddress: { type: String },
    contactNumber: { type: String },
    milkTypes: [{ type: String, enum: ["cow", "buffalo"] }],
    defaultMilkRate: { type: Number },
    startDate: {},
    endDate: {},
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);

