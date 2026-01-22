const express = require("express")
require("dotenv").config()
const cors = require("cors")
const cookiePars = require("cookie-parser")
// routes 
const authRoute = require("./routes/auth/auth.route")
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookiePars())
app.use("/api/auth", authRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
});
module.exports = app