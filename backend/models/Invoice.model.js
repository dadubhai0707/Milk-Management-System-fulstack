import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },

    totalMilkQty: { type: Number, required: true },
    totalAmount: { type: Number, required: true },

    paid: { type: Boolean, default: false },
    paymentDate: { type: Date },

    downloaded: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
