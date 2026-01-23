const Address = require("../../../models/Address.model");
const Store = require("../../../models/Store.model");
const ApiError = require("../../../utils/apiError");

const createAddress = async (req, res, next) => {
    try {
        const { areaName, city, pincode } = req.body;

        if (!areaName) {
            throw new ApiError(400, "Area name is required");
        }

        // Find store of logged-in owner
        const store = await Store.findOne({ userId: req.user._id });
        if (!store) {
            throw new ApiError(404, "Store not found for this owner");
        }

        // Optional: prevent duplicate area in same store
        const existingArea = await Address.findOne({
            storeID: store._id,
            areaName: areaName.trim(),
            isActive: true
        });

        if (existingArea) {
            throw new ApiError(409, "Area already exists in this store");
        }

        const address = await Address.create({
            storeID: store._id,
            areaName: areaName.trim(),
            city: city ? city.trim() : undefined,
            pincode: pincode ? pincode.trim() : undefined
        });

        res.status(201).json({
            success: true,
            message: "Address created successfully",
            data: address
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET ALL ADDRESSES (OWNER STORE)
 */
const getAllAddresses = async (req, res, next) => {
    try {
        const store = await Store.findOne({ userId: req.user._id });
        if (!store) {
            throw new ApiError(404, "Store not found");
        }

        const addresses = await Address.find({
            storeID: store._id,
            isActive: true
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: addresses
        });
    } catch (error) {
        next(error);
    }
};

/**
 * UPDATE ADDRESS
 */
const updateAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { areaName, city, pincode, isActive } = req.body;

        const store = await Store.findOne({ userId: req.user._id });
        if (!store) {
            throw new ApiError(404, "Store not found");
        }

        const updatePayload = {};

        if (areaName) updatePayload.areaName = areaName.trim();
        if (city) updatePayload.city = city.trim();
        if (pincode) updatePayload.pincode = pincode.trim();
        if (typeof isActive === "boolean") updatePayload.isActive = isActive;

        const address = await Address.findOneAndUpdate(
            { _id: id, storeID: store._id },
            updatePayload,
            { new: true, runValidators: true }
        );

        if (!address) {
            throw new ApiError(404, "Address not found");
        }

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: address
        });
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE ADDRESS (SOFT DELETE)
 */
const deleteAddress = async (req, res, next) => {
    try {
        const { id } = req.params;

        const store = await Store.findOne({ userId: req.user._id });
        if (!store) {
            throw new ApiError(404, "Store not found");
        }

        const address = await Address.findOneAndUpdate(
            { _id: id, storeID: store._id },
            { isActive: false },
            { new: true }
        );

        if (!address) {
            throw new ApiError(404, "Address not found");
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAddress,
    updateAddress,
    getAllAddresses,
    deleteAddress,
}
