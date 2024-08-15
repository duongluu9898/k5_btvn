const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const homeRouter = require("./home");
const accountRouter = require("./account");
const passwordRouter = require("./password");
const authMiddleware = require("../middlewares/auth.middleware");
const forgotPasswordRouter = require("./forgotPassword");
const resetPasswordRouter = require("./resetPassword");

router.use(resetPasswordRouter);
router.use(forgotPasswordRouter);
router.use("/auth", authRouter);
router.use(authMiddleware);
router.use("/", homeRouter);
router.use("/", passwordRouter);
// router.use("/", accountRouter);
// router.use("/", passwordRouter);

module.exports = router;
