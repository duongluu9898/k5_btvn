const { User } = require("../models/index");
const bcrypt = require("bcrypt");
module.exports = {
  index: (req, res) => {
    if (req.session.user) {
      return res.redirect("/");
    }
    const msg = req.flash("msg");
    const errors = req.flash("errors");
    res.render("auth/login", {
      layout: "auth/layout",
      msg,
      errors: errors.length ? errors[0] : {},
    });
  },

  handleLogin: async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const errors = {};
    if (!email & !password) {
      req.flash("msg", "Vui lòng nhập đầy đủ thông tin thông tin");
    }
    if (!email) {
      errors.email = "Vui lòng nhập email";
    }
    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }

    if (Object.keys(errors).length) {
      req.flash("errors", errors);
      return res.redirect("/auth/login");
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash("msg", "Tài khoản không tồn tại");
      return res.redirect("/auth/login");
    }
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      req.flash("msg", "Mật khẩu hoặc tài khoản không chính xác");
      return res.redirect("/auth/login");
    }

    if (user) {
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }

    res.redirect("/");
  },
};
