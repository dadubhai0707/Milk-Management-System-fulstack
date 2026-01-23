const MilkProcurement = require("../../../models/MilkProcurement.model");
const Vendor = require("../../../models/Vendor.model");
const Store = require("../../../models/Store.model");
const ApiError = require("../../../utils/apiError");
const asyncHandler = require("../../../utils/asyncHandle");

/**
 * CREATE MILK PROCUREMENT
 */
const createMilkProcurement = asyncHandler(async (req, res) => {
    const {
        vendorId,
        milkTypesSupplied,
        quantity,
        ratePerLiter,
        date,
        notes
    } = req.body;

    if (!vendorId || !quantity || !ratePerLiter || !date) {
        throw new ApiError(400, "Required fields are missing");
    }

    const store = await Store.findOne({ userId: req.user._id });
    if (!store) {
        throw new ApiError(404, "Store not found");
    }

    const vendor = await Vendor.findOne({
        _id: vendorId,
        storeID: store._id,
        isActive: true
    });

    if (!vendor) {
        throw new ApiError(404, "Vendor not found for this store");
    }

    const procurementDate = new Date(date);
    procurementDate.setHours(0, 0, 0, 0);

    const existingEntry = await MilkProcurement.findOne({
        vendorId,
        storeID: store._id,
        date: procurementDate
    });

    if (existingEntry) {
        throw new ApiError(
            409,
            "Milk procurement already exists for this vendor on this date"
        );
    }

    const totalAmount = quantity * ratePerLiter;

    const procurement = await MilkProcurement.create({
        vendorId,
        storeID: store._id,
        milkTypesSupplied,
        quantity,
        ratePerLiter,
        totalAmount,
        date: procurementDate,
        notes
    });

    res.status(201).json({
        success: true,
        message: "Milk procurement added successfully",
        data: procurement
    });
});

/**
 * GET ALL MILK PROCUREMENTS (STORE)
 */
const getAllMilkProcurements = asyncHandler(async (req, res) => {
    const store = await Store.findOne({ userId: req.user._id });
    if (!store) {
        throw new ApiError(404, "Store not found");
    }

    const procurements = await MilkProcurement.find({
        storeID: store._id
    })
        .populate("vendorId", "name mobile")
        .sort({ date: -1 });

    res.status(200).json({
        success: true,
        data: procurements
    });
});

/**
 * UPDATE MILK PROCUREMENT
 */
const updateMilkProcurement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { milkTypesSupplied, quantity, ratePerLiter, notes } = req.body;

    const store = await Store.findOne({ userId: req.user._id });
    if (!store) {
        throw new ApiError(404, "Store not found");
    }

    const procurement = await MilkProcurement.findOne({
        _id: id,
        storeID: store._id
    });

    if (!procurement) {
        throw new ApiError(404, "Milk procurement not found");
    }

    if (milkTypesSupplied) procurement.milkTypesSupplied = milkTypesSupplied;
    if (quantity !== undefined) procurement.quantity = quantity;
    if (ratePerLiter !== undefined) procurement.ratePerLiter = ratePerLiter;
    if (notes) procurement.notes = notes;

    procurement.totalAmount =
        procurement.quantity * procurement.ratePerLiter;

    await procurement.save();

    res.status(200).json({
        success: true,
        message: "Milk procurement updated successfully",
        data: procurement
    });
});

/**
 * DELETE MILK PROCUREMENT
 */
const deleteMilkProcurement = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const store = await Store.findOne({ userId: req.user._id });
    if (!store) {
        throw new ApiError(404, "Store not found");
    }

    const procurement = await MilkProcurement.findOneAndDelete({
        _id: id,
        storeID: store._id
    });

    if (!procurement) {
        throw new ApiError(404, "Milk procurement not found");
    }

    res.status(200).json({
        success: true,
        message: "Milk procurement deleted successfully"
    });
});

module.exports = {
    createMilkProcurement,
    getAllMilkProcurements,
    updateMilkProcurement,
    deleteMilkProcurement
};