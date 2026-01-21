import User from "../../models/User.model.js";
import ApiResponse from "../../utils/apiResponse.js";
import ApiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandle.js";
import { generateTokens } from "../../service/auth.service.js";

export const verifyOtp = asyncHandler(async (req, res) => {
    const { mobile, otp } = req.body;

    const user = await User.findOne({ mobile });

    if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
        throw new ApiError(400, "Invalid or expired OTP");
    }

    user.otp = null;
    user.otpExpiresAt = null;
    user.isMobileVerified = true;
    user.lastLoginAt = new Date();

    const { accessToken, refreshToken } = await generateTokens(user._id);

    await user.save({ validateBeforeSave: false });

    res.status(200).json(
        new ApiResponse(200, {
            accessToken,
            refreshToken,
            role: user.role
        }, "OTP verified successfully")
    );
});
