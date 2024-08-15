const express = require("express");
const router = express.Router();
const passport = require("passport");
const loginController = require("../controllers/login.controller");
const registerController = require("../controllers/register.controller");
router.get("/login", loginController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    badRequestMessage: "Vui lòng nhập email và mật khẩu",
    successRedirect: "/",
  })
);
router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (!error) {
      return res.redirect("/auth/login");
    }
  });
});
router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureFlash: true,
    failureRedirect: "/auth/login",
    successRedirect: "/",
  })
);

router.get("/register", registerController.index);
router.post("/register", registerController.handleRegister);
// router.post("/register", registerController.handleRegister);
module.exports = router;
