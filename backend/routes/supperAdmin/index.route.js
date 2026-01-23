const express = require("express");
const router = express.Router();
router.use("/subscription", require("./subscription.route"));
module.exports = router;