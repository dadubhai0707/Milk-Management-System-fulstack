const Address = require("../../models/Address.model");
const ApiError = require("../../utils/apiError");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandle");

// ================= CREATE ADDRESS =================
const createAddress = asyncHandler(async (req, res) => {
    const { areaName, city, pincode } = req.body;

    if (!areaName) {
        throw new ApiError(400, "Area name is required");
    }

    const address = await Address.create({
        ownerId: req.user._id,
        areaName,
        city,
        pincode
    });

    return res.status(201).json(
        new ApiResponse(201, address, "Area created successfully")
    );
});

// ================= GET ALL ADDRESSES =================
const getAddresses = asyncHandler(async (req, res) => {
    const addresses = await Address.find({
        ownerId: req.user._id,
        isActive: true
    }).sort({ createdAt: -1 });
    return res.status(200).json(
        new ApiResponse(200, addresses, "Address list fetched")
    );
});

// ================= UPDATE ADDRESS =================
const updateAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const address = await Address.findOneAndUpdate(
        { _id: id, ownerId: req.user._id },
        req.body,
        { new: true }
    );

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    return res.status(200).json(
        new ApiResponse(200, address, "Address updated successfully")
    );
});

// ================= DELETE ADDRESS (SOFT) =================
const deleteAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const address = await Address.findOneAndUpdate(
        { _id: id, ownerId: req.user._id },
        { isActive: false },
        { new: true }
    );

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Address deleted successfully")
    );
});

module.exports = {
    createAddress,
    getAddresses,
    updateAddress,
    deleteAddress
};