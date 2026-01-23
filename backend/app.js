const express = require("express")
require("dotenv").config()
const cors = require("cors")
const cookiePars = require("cookie-parser")
const Razorpay = require("razorpay")
// routes 
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookiePars())
// const razorpay = new Razorpay({
//     key_id: 'rzp_test_S7CCZX41AkX6i4', // Apni Key ID yahan dalein
//     key_secret: 'o5W3p4Mg1xPd566Ij9lsDzql', // Apna Secret yahan dalein
// });
// ----------------------------
// all router 
// ----------------------------
// -----------
//  auth apis
// -----------
app.use("/api/auth", require("./routes/auth/auth.route"))
// -----------
//  superAdmin apis
// -----------
app.use("/api/super-admin", require("./routes/supperAdmin/index.route"));
// ----------------------------------
// common response handle
// ----------------------------------

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
});
module.exports = app