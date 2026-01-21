import User from "../../models/User.model.js";
import ApiResponse from "../../utils/apiResponse.js";
import ApiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandle.js";
import { isValidIndianMobile } from "../../utils/phone.util.js";
import { generateOtp, saveOtpForUser, sendOtpSms } from "../../service/auth.service.js";

export const sendOtp = asyncHandler(async (req, res) => {
    const { mobile } = req.body;

    if (!isValidIndianMobile(mobile)) {
        throw new ApiError(400, "Invalid mobile number");
    }

    let user = await User.findOne({ mobile });
    if (!user) {
        user = await User.create({ name: "New User", mobile });
    }

    const otp = generateOtp();
    await saveOtpForUser(mobile, otp);
    await sendOtpSms(mobile, otp);

    res.status(200).json(
        new ApiResponse(200, null, "OTP sent successfully")
    );
});
