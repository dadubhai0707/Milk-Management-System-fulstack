import mongoose from "mongoose";
const joinRequestSchema = new mongoose.Schema(
  {
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true
    },

    roleRequested: {
      type: String,
      enum: ["seller", "customer"],
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true
    },

    message: {
      type: String,
      trim: true
    },

    processedAt: {
      type: Date
    }
  },
  { timestamps: true }
);
// Ek user ek admin ko ek hi pending request bhej sake
joinRequestSchema.index(
  { requesterId: 1, adminId: 1, roleRequested: 1 },
  { unique: true }
);
export default mongoose.model("JoinRequest", joinRequestSchema);