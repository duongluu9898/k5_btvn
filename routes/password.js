const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/password.controller");
router.get("/password", passwordController.index);
router.post("/password", passwordController.handlePassword);

module.exports = router;
