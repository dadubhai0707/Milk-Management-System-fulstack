const SubscriptionPlan = require("../../models/SubscriptionPlan.model");
const ApiError = require("../../utils/apiError");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandle");

// ================= CREATE PLAN =================
const createPlan = async (req, res) => {
    try {
        const {
            name,
            maxCustomers,
            maxSellers,
            price,
            planType,
            duration,
            features
        } = req.body;

        // Basic validation
        if (
            !name ||
            maxCustomers === undefined ||
            maxSellers === undefined ||
            price === undefined ||
            !planType ||
            !duration
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        const plan = await SubscriptionPlan.create({
            name: name.trim(),
            maxCustomers,
            maxSellers,
            price,
            planType,
            duration,
            features: Array.isArray(features) ? features : [],
            createdBy: req.user._id
        });

        return res.status(201).json({
            success: true,
            message: "Subscription plan created successfully",
            data: plan
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= GET ALL PLANS =================
const getAllPlans = async (req, res) => {
    try {
        const plans = await SubscriptionPlan.find({ isActive: true })
            .select("-__v")
            .sort({ price: 1 });

        return res.status(200).json({
            success: true,
            data: plans
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


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
const updatePlan = async (req, res) => {
    try {
        const {
            name,
            maxCustomers,
            maxSellers,
            price,
            planType,
            duration,
            features,
            isActive
        } = req.body;

        const updatePayload = {};

        if (name) updatePayload.name = name.trim();
        if (maxCustomers !== undefined) updatePayload.maxCustomers = maxCustomers;
        if (maxSellers !== undefined) updatePayload.maxSellers = maxSellers;
        if (price !== undefined) updatePayload.price = price;
        if (planType) updatePayload.planType = planType;
        if (duration) updatePayload.duration = duration;
        if (Array.isArray(features)) updatePayload.features = features;
        if (typeof isActive === "boolean") updatePayload.isActive = isActive;

        updatePayload.updatedBy = req.user._id;

        const plan = await SubscriptionPlan.findByIdAndUpdate(
            req.params.id,
            updatePayload,
            { new: true, runValidators: true }
        );

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Subscription plan not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Subscription plan updated successfully",
            data: plan
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= DELETE (DISABLE) PLAN =================
const updatePlanStatus = async (req, res) => {
    try {
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be boolean"
            });
        }

        const plan = await SubscriptionPlan.findByIdAndUpdate(
            req.params.id,
            { isActive },
            { new: true }
        );

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Subscription plan not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Plan status updated successfully",
            data: plan
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createPlan,
    getAllPlans,
    updatePlan,
    getPlanById,
    updatePlanStatus,
};
