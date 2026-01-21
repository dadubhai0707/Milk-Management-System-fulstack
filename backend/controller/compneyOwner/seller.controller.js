const User = require("../../models/User.model");
const Seller = require("../../models/Seller.model");
const Address = require("../../models/Address.model");
const ApiError = require("../../utils/apiError");
const asyncHandler = require("../../utils/asyncHandle");

// ================================================
// createSeller
// ================================================
const createSeller = asyncHandler(async (req, res) => {
    const { name, mobile, password, assignedAreaIds } = req.body;

    if (!assignedAreaIds || assignedAreaIds.length === 0) {
        throw new ApiError(400, "At least one area required");
    }

    // validate areas belong to owner
    const count = await Address.countDocuments({
        _id: { $in: assignedAreaIds },
        ownerId: req.user._id
    });

    if (count !== assignedAreaIds.length) {
        throw new ApiError(403, "Invalid area selection");
    }

    const user = await User.create({
        name,
        mobile,
        password,
        role: "seller"
    });

    const seller = await Seller.create({
        userId: user._id,
        ownerId: req.user._id,
        assignedAreaIds
    });

    res.status(201).json({
        success: true,
        message: "Seller created",
        data: seller
    });
});

module.exports = { createSeller };