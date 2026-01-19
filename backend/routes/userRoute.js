const express = require("express")
const userRoute = express.Router()
const { getUser } = require("../controller/User.Controller")

userRoute.get("/", userRoute);

module.exports = userRoute