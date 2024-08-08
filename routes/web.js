const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const homeRouter = require("./home");
const accountRouter = require("./account");
const passwordRouter = require("./password");
const authMiddleware = require("../middlewares/auth.middleware");

router.use("/auth", authRouter);
router.use(authMiddleware);
router.use("/", homeRouter);
router.use("/", accountRouter);
router.use("/", passwordRouter);
module.exports = router;
