const bcrypt = require("bcrypt");
const { User } = require("../models/index");
module.exports = {
  index: async (req, res) => {
    const email = req.session.user.email;
    const errors = req.flash("errors");
    const msg = req.flash("msg");
    await res.render("password", {
      layout: "auth/layout",
      email,
      msg,
      errors: errors.length ? errors[0] : {},
    });
  },

  handlePassword: async (req, res) => {
    const password = req.body.password;
    console.log(password[0], password[1], password[2]);
    const email = req.session.user.email;
    const user = await User.findOne({ where: { email } });
    const errors = {};

    //validate the password
    if (!password[0]) {
      errors.password = "Vui lòng nhập mật khẩu";
    }
    if (!password[1]) {
      errors.password = "Vui lòng nhập mật khẩu";
    }
    if (!password[2]) {
      errors.password = "Vui lòng nhập mật khẩu";
    }

    if (password[2] !== password[1]) {
      errors.password = "Mật khẩu nhập lại không đúng";
    }
    const result = await bcrypt.compare(password[0], user.password);

    if (!result) {
      req.flash("msg", "Mật khẩu cũ của bạn không đúng");
    }
    if (Object.keys(errors).length) {
      req.flash("errors", errors);
      return res.redirect("/password");
    }
    if (password[1] === password[2]) {
      const hashedPassword = await bcrypt.hash(password[2], 10);
      await User.update({ password: hashedPassword }, { where: { email } });
      req.flash("msg", "Đổi mật khẩu thành công");
      return res.redirect("/auth/login");
    }

    res.redirect("/password");
  },
};
