import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["super_admin", "admin", "seller", "customer"],
      default: "customer",
      required: true
    },

    refreshKey: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    isBlocked: {
      type: Boolean,
      default: false
    },

    profileImage: {
      type: String,
      default: ""
    },
    
    lastLoginAt: {
      type: Date
    },

    permissions: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);
