const bcrypt = require("bcrypt");
const { User } = require("../models/index");
module.exports = {
  index: (req, res) => {
    const msg1 = req.flash("msg1");
    const errors = req.flash("errors");
    res.render("auth/register", {
      layout: "auth/layout",
      msg1,
      errors: errors.length ? errors[0] : {},
    });
  },

  handleRegister: async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const user = await User.findOne({ where: { email } });
    const errors = {};

    // console.log(email, password[1], password[0]);
    // if (!email & !password[0] & password[1]) {
    //   req.flash("msg2", "Vui lòng nhập đầy đủ thông tin thông tin");
    // }
    if (!email) {
      errors.email = "Vui lòng nhập email";
    }
    if (!password[0]) {
      errors.password = "Vui lòng nhập mật khẩu";
    }
    if (!password[1]) {
      errors.password = "Vui lòng nhập mật khẩu";
    }
    if (password[0] !== password[1]) {
      errors.password = "Mật khẩu nhập lại không đúng";
    }
    if (Object.keys(errors).length) {
      req.flash("errors", errors);
      return res.redirect("/auth/register");
    }

    if (email) {
      const hashedPassword = await bcrypt.hash(password[0], 10);
      await User.create({ email, password: hashedPassword });
      req.flash("msg", "Đăng ký thành công");
      return res.redirect("/auth/login");
    }

    if (email === user.email) {
      req.flash("msg1", "Email đã tồn tại");
      return res.redirect("/auth/register");
    }

    res.redirect("/auth/register");
  },
};
