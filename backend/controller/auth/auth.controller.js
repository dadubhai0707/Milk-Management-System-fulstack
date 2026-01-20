const User = require("../../model/user.model");
const ApiResponse = require("../../utils/apiResponse");
const ApiError = require("../../utils/apiError");
const asyncHandler = require("../../utils/asyncHandle");
const { validationResult } = require("express-validator");
const { Save, GenerateAndAccessToken } = require("../../service/auth.service");
const Register = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "Validation Error",
            errors.array()
        ))
    }
    const { FullName, Email, Phone, Password, Gender, Address } = req.body;

    const alreadyUser = await User.findOne({ Email });
    if (alreadyUser) {
        return res.status(409).json(new ApiError(409, "Email already exists", [
            { msg: "This email is already registered", param: "Email" }
        ]))
    }
    const savedUser = await Save({ FullName, Email, Phone, Password, Gender, Address });

    return res
        .status(201)
        .json(new ApiResponse(201, savedUser, "User registered successfully"));
});



const Login = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "Validation Error",
            errors.array()
        ))
    }
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email }).select("+Password")

    if (!user) {
        return res.status(404).json(new ApiError(404, "User Does Not Exist ", "User Does Not Exist "))
    }

    const checkPassword = await user.isPasswordCorrect(Password)
    if (!checkPassword) {
        return res.status(401).json(new ApiError(401, "User Does Not Exist", "In Valid Password"))
    }

    const { accessToken, refreshToken, error } = await GenerateAndAccessToken(user._id)
    if (error != null) {
        return res.status(404).json(new ApiError(404, "unAuthorized Accessed ", "unAuthorized Accessed "))
    }

    const loggedInUser = await User.findById(user._id).select("-RefreshToken")
    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "Lax"
    }

    return res
        .status(200)
        .cookie("AccessToken", accessToken, option)
        .cookie("RefreshToken", refreshToken, option)
        .json(new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        ))
});

module.exports = {
    Register,
    Login
};
