import mongoose from "mongoose";

const paymentReminderSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    reminderType: {
      type: String,
      enum: ["first", "second", "final"],
      required: true
    },

    reminderDate: { type: Date, required: true },
    sent: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("PaymentReminder", paymentReminderSchema);
