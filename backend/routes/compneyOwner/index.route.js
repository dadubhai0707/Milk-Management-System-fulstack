const express = require("express");
const router = express.Router();
router.use("/address", require('./address/address.route'))
router.use("/vendor", require('./vendor/vendor.route'))
router.use("/vendor/milkProcurement", require('./vendor/milkProcurement.route'))
router.use("/plan", require('./purchasePlan/plan.route'))
module.exports = router