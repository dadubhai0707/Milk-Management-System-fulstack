const express = require("express");
const router = express.Router();
// sub routes
router.use("/subscriptions", require("./subscription.route"));
module.exports = router;