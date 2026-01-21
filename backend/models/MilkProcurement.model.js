import mongoose from "mongoose";
const milkProcurementSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true
    },

    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true
    },

    milkTypesSupplied: [
      {
        type: String,
        enum: ["cow", "buffalo"]
      }
    ],

    quantity: {
      type: Number,
      required: true,
      min: 0
    },

    ratePerLiter: {
      type: Number,
      required: true,
      min: 0
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    date: {
      type: Date,
      required: true,
      index: true
    },
    notes: {
      type: String,
      trim: true
    },
  },
  { timestamps: true }
);

milkProcurementSchema.index(
  { vendorId: 1, date: 1 },
  { unique: true }
);

export default mongoose.model("MilkProcurement", milkProcurementSchema);