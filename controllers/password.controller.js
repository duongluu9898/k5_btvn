const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const { string } = require("yup");
module.exports = {
  index: async (req, res) => {
    const msgError = req.flash("msgError");
    const msgSuccess = req.flash("msgSuccess");
    await res.render("auth/password", {
      msgError,
      msgSuccess,
      req,
    });
  },

  handlePassword: async (req, res) => {
    //validate the password
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const reTypePassword = req.body.reTypePassword;
    const { user: id } = req.session.passport;
    console.log(newPassword, reTypePassword);

    const body = await req.validate(req.body, {
      oldPassword: string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải ít nhất 6 kí tự"),
      newPassword: string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải ít nhất 6 kí tự"),
      reTypePassword: string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải ít nhất 6 kí tự")
        .test("check-password", "Mật khẩu phải giống nhau", async () => {
          if (newPassword !== reTypePassword) {
            return false;
          }
          if (newPassword === reTypePassword) {
            return true;
          }
        }),
    });

    const user = await User.findOne({
      where: { id },
    });
    const result = await bcrypt.compare(oldPassword, user.password);
    if (!result) {
      req.flash("msgError", "Mật khẩu cũ của bạn không đúng");
    }
    if (body) {
      if (newPassword === reTypePassword) {
        const hashedPassword = await bcrypt.hash(reTypePassword, 10);
        await User.update({ password: hashedPassword }, { where: { id } });
        req.flash("msgSuccess", "Đổi mật khẩu thành công");
        return res.redirect("/");
      }
    }

    res.redirect("/password");
  },
};
