const SubscriptionPlan = require("../../models/SubscriptionPlan.model");
const ApiError = require("../../utils/apiError");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandle");

// ================= CREATE PLAN =================
const createPlan = asyncHandler(async (req, res) => {
    const plan = await SubscriptionPlan.create({
        ...req.body,
        createdBy: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, plan, "Subscription plan created")
    );
});

// ================= GET ALL PLANS =================
const getPlans = asyncHandler(async (req, res) => {
    const plans = await SubscriptionPlan.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, plans, "Subscription plans fetched")
    );
});


// ================= GET SINGLE PLAN =================
const getPlanById = asyncHandler(async (req, res) => {
    const plan = await SubscriptionPlan.findById(req.params.id);

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    return res.status(200).json(
        new ApiResponse(200, plan, "Subscription plan fetched")
    );
});

// ================= UPDATE PLAN =================
const updatePlan = asyncHandler(async (req, res) => {
    const plan = await SubscriptionPlan.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedBy: req.user._id },
        { new: true }
    );

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    return res.status(200).json(
        new ApiResponse(200, plan, "Subscription plan updated")
    );
});


// ================= DELETE (DISABLE) PLAN =================
const deletePlan = asyncHandler(async (req, res) => {
    const plan = await SubscriptionPlan.findByIdAndUpdate(
        req.params.id,
        { isActive: false, updatedBy: req.user._id },
        { new: true }
    );

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Subscription plan disabled")
    );
});

module.exports = {
    createPlan,
    getPlans,
    getPlanById,
    updatePlan,
    deletePlan
};
