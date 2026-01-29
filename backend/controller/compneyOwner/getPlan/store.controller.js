require("dotenv").config();

const User = require("../../../models/User.model");
const Store = require("../../../models/Store.model");
const SubscriptionPlan = require("../../../models/SubscriptionPlan.model");

const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: "rzp_test_S9ZwbzJa3dGU4k",
    key_secret: "oICN0DhGn2sn5wg4e9inbwaE"
});

const createRazorpayOrder = async (req, res) => {
    try {
        const { planId } = req.body;

        const plan = await SubscriptionPlan.findOne({
            _id: planId,
            isActive: true
        });

        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        const options = {
            amount: plan.price * 100,
            currency: "INR",
            receipt: `plan_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order,
            plan: {
                id: plan._id,
                name: plan.name,
                price: plan.price
            }
        });

    } catch (error) {
        console.error("🔥 CONTROLLER ERROR:", error);

        res.status(500).json({
            message: error.message,
            name: error.name,
            stack: error.stack
        });
    }
};

const verifyAndActivateStore = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            planId,
            shopName,
            shopAddress,
            contactNumber
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        // const expectedSignature = crypto
        //     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        //     .update(body)
        //     .digest("hex");

        // if (expectedSignature !== razorpay_signature) {
        //     return res.status(400).json({ message: "Invalid payment signature" });
        // }

        const plan = await SubscriptionPlan.findById(planId);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        const existingStore = await Store.findOne({ userId: req.user._id });
        if (existingStore) {
            return res.status(400).json({ message: "Store already exists" });
        }
        const store = await Store.create({
            userId: req.user._id,
            shopName,
            shopAddress,
            contactNumber,
            planId: plan._id,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            amount: plan.price
        });
        await User.findByIdAndUpdate(req.user._id, {
            role: "owner"
        });

        res.status(201).json({
            success: true,
            message: "Store activated successfully",
            store
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRazorpayOrder,
    verifyAndActivateStore
}