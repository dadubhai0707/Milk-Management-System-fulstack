const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandle");

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    );
});

module.exports = {
    getUser,
}