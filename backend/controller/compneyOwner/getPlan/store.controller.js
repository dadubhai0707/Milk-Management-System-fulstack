const razorpay = require("../config/razorpay");
const SubscriptionPlan = require("../../../models/SubscriptionPlan.model");
exports.createStoreOrder = async (req, res) => {
    const { planId } = req.body;
    if (!planId) {
        return res.status(400).json({ message: "Plan ID required" });
    }

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan || !plan.isActive) {
        return res.status(400).json({ message: "Invalid plan" });
    }

    const options = {
        amount: plan.price * 100, // paise
        currency: "INR",
        receipt: `plan_${plan._id}_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    return res.status(201).json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID
    });
};
