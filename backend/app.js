const express = require("express")
require("dotenv").config()
const cors = require("cors")
const cookiePars = require("cookie-parser")
const userRoute = require("./routes/userRoute")
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookiePars())
app.use("/api/auth", userRoute)

module.exports = app