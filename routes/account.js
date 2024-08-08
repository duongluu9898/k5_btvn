const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");

router.use("/account", accountController.index);

module.exports = router;
