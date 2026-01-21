const User = require("../../models/User.model");
const Customer = require("../../models/Customer.model");
const Address = require("../../models/Address.model");
const ApiError = require("../../utils/apiError");
const asyncHandler = require("../../utils/asyncHandle");
// ================================================
// create customer 
// ================================================
const createCustomer = asyncHandler(async (req, res) => {
    const { name, mobile, password, addressId, milkType, dailyQty } = req.body;

    if (!addressId) {
        throw new ApiError(400, "Address is required");
    }

    // check address belongs to owner
    const address = await Address.findOne({
        _id: addressId,
        ownerId: req.user._id
    });

    if (!address) {
        throw new ApiError(403, "Invalid address for this owner");
    }

    // create user
    const user = await User.create({
        name,
        mobile,
        password,
        role: "customer"
    });

    // create customer profile
    const customer = await Customer.create({
        userId: user._id,
        ownerId: req.user._id,
        addressId,
        milkType,
        dailyQty
    });

    res.status(201).json({
        success: true,
        message: "Customer created",
        data: customer
    });
});

module.exports = { createCustomer };