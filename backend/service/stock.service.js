const MilkProcurement = require("../models/MilkProcurement.model");
const MilkDelivery = require("../models/MilkDelivery.model");


const calculateStock = async (ownerId) => {
    // INWARD
    const inward = await MilkProcurement.aggregate([
        { $match: { ownerID: ownerId } },
        {
            $group: {
                _id: "$milkType",
                totalIn: { $sum: "$quantity" }
            }
        }
    ]);

    // OUTWARD
    const outward = await MilkDelivery.aggregate([
        { $match: { ownerID: ownerId } },
        {
            $group: {
                _id: "$milkType",
                totalOut: { $sum: "$milkQty" }
            }
        }
    ]);

    // merge result
    const stock = {};

    inward.forEach(i => {
        stock[i._id] = { milkType: i._id, in: i.totalIn, out: 0 };
    });

    outward.forEach(o => {
        if (!stock[o._id]) {
            stock[o._id] = { milkType: o._id, in: 0, out: o.totalOut };
        } else {
            stock[o._id].out = o.totalOut;
        }
    });

    return Object.values(stock).map(s => ({
        milkType: s.milkType,
        availableStock: s.in - s.out
    }));
};

module.exports = {
    calculateStock
};
