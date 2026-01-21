const User = require("../../models/User.model");
const ApiResponse = require("../../utils/apiResponse");
const ApiError = require("../../utils/apiError");
const asyncHandler = require("../../utils/asyncHandle");

// ================= REGISTER =================
const Register = asyncHandler(async (req, res) => {
    const { name, mobile, password } = req.body;

    if (!name || !mobile || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
        throw new ApiError(409, "Mobile number already registered");
    }

    const user = await User.create({
        name,
        mobile,
        password
    });

    return res.status(201).json(
        new ApiResponse(201, {
            _id: user._id,
            name: user.name,
            mobile: user.mobile,
            role: user.role
        }, "User registered successfully")
    );
});


// ================= LOGIN =================
const Login = asyncHandler(async (req, res) => {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
        throw new ApiError(400, "Mobile and password required");
    }

    const user = await User.findOne({ mobile }).select("+password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (!user.isActive || user.isBlocked) {
        throw new ApiError(403, "Account disabled or blocked");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();
    await user.save({ validateBeforeSave: false });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    };

    return res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .status(200)
        .json(new ApiResponse(200, {
            user: {
                _id: user._id,
                name: user.name,
                mobile: user.mobile,
                role: user.role
            }
        }, "Login successful"));
});


// ================= LOGOUT =================
const Logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 }
    });

    return res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .status(200)
        .json(new ApiResponse(200, {}, "Logout successful"));
});

module.exports = {
    Register,
    Login,
    Logout,
}