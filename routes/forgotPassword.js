const express = require("express");
const router = express.Router();
const forgotPasswordController = require("../controllers/forgotPassword.controller");
router.get("/forgot-password", forgotPasswordController.index);
router.post("/forgot-password", forgotPasswordController.handle);
module.exports = router;
