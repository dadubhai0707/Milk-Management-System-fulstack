import mongoose from "mongoose";
const customerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        storeID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
            index: true
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true,
            index: true
        },
        fullAddress: {
            type: String,
            required: true,
        },
        milkType: {
            type: String,
            enum: ["cow", "buffalo"],
            required: true
        },

        dailyQty: {
            type: Number,
            default: 1,
            min: 0
        },

        ratePerLiter: {
            type: Number,
            min: 0
        },

        billingStartDate: {
            type: Date,
            required: true
        },

        lastBillingDate: {
            type: Date
        },

        nextBillingDate: {
            type: Date,
            index: true
        },

        pauseFrom: {
            type: Date
        },

        pauseTo: {
            type: Date
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);
export default mongoose.model("Customer", customerSchema);