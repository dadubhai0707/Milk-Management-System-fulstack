const express = require("express")
const authRouter = express.Router()
const { Register, Login } = require("../../controller/auth/auth.controller")
const { body } = require("express-validator");
authRouter.post(
    "/register",
    [
        body("FullName.FirstName")
            .isLength({ min: 3 })
            .withMessage("First name must be at least 3 characters long"),
        body("FullName.LastName")
            .notEmpty()
            .withMessage("Last name is required"),
        body("Phone")
            .isLength({ min: 10, max: 10 })
            .withMessage("Phone number must be 10 digits"),

        body("Password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),

        body("Gender")
            .isIn(["Male", "Female", "Other"])
            .withMessage("Gender must be Male, Female or Other"),

        body("Address.*.City")
            .notEmpty()
            .withMessage("City is required"),
    ],
    Register
);

authRouter.post("/login", [
    body("Email")
        .isEmail()
        .withMessage("Please Enter Valid Email"),
    body("Password")
        .isLength({ min: 6, max: 8 })
        .withMessage("Password Must >6 and <8")
], Login)
module.exports = authRouter