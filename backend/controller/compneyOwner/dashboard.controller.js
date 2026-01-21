const { calculateStock } = require("../../service/stock.service");
const asyncHandler = require("../../utils/asyncHandle");
const getStockSummary = asyncHandler(async (req, res) => {
    const ownerId = req.user._id;
    const stock = await calculateStock(ownerId);
    res.status(200).json({
        success: true,
        data: stock
    });
});
module.exports = { getStockSummary };