const { string } = require("yup");
const bcrypt = require("bcrypt");
const { User, Provider } = require("../models/index");
const ls = require("local-storage");
const sendMail = require("../utils/mail");

module.exports = {
  index: async (req, res) => {
    const msgSuccess = req.flash("msgSuccess");
    const msgError = req.flash("msgError");
    res.render("forgotPassword/resetPassword", { req, msgSuccess, msgError });
  },

  handlePassword: async (req, res) => {
    //validate password
    const body = await req.validate(req.body, {
      newPassword: string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải ít nhất 6 kí tự"),
      reTypeNewPassword: string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải ít nhất 6 kí tự")
        .test("check-password", "Mật khẩu phải giống nhau", async () => {
          const newPassword = req.body.newPassword;
          const reTypeNewPassword = req.body.reTypeNewPassword;
          if (newPassword === reTypeNewPassword) {
            return true;
          }
          if (newPassword !== reTypeNewPassword) {
            return false;
          }
        }),
    });

    // update password
    if (body) {
      const newPassword = req.body.newPassword;
      const reTypeNewPassword = req.body.reTypeNewPassword;
      const email = ls.get("email");
      const provider = await Provider.findOne({ where: { name: "email" } });
      const user = await User.findOne({
        where: { email, provider_id: provider.id },
      });
      const timeIsNow = new Date().getTime();
      const expired_token = user.expired_token;
      console.log(timeIsNow, expired_token);

      if (timeIsNow > expired_token) {
        req.flash("msgError", "Liên kết này đã hết hạn hoặc không tồn tại!");
        return res.redirect("/reset-password");
      }
      if (newPassword === reTypeNewPassword) {
        const hashedPassword = await bcrypt.hash(reTypeNewPassword, 10);
        await User.update({ password: hashedPassword }, { where: { email } });
        req.flash(
          "msgSuccess",
          "Đổi mật khẩu thành công. Hãy đăng nhập với mật khẩu mới!"
        );

        sendMail(email, "Chúc mừng bạn lấy mật khẩu thành công!");
        return res.redirect("/reset-password");
      }
    }

    res.redirect("/reset-password");
  },
};
