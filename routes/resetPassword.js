const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPassword.controller");
router.get("/reset-password", resetPasswordController.index);
router.post("/reset-password", resetPasswordController.handlePassword);
module.exports = router;
