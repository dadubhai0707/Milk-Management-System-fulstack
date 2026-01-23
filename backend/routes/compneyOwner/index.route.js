const express = require("express");
const router = express.Router();
router.use("/address", require('./address/address.route'))
module.exports = router