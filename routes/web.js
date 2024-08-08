const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const homeRouter = require("./home");
const authMiddleware = require("../middlewares/auth.middleware");

router.use("/auth", authRouter);
router.use(authMiddleware);
router.use("/", homeRouter);
module.exports = router;
