const { User, Provider } = require("../models/index");
const sendMail = require("../utils/mail");
const { string } = require("yup");
const md5 = require("md5");
var ls = require("local-storage");
module.exports = {
  index: async (req, res) => {
    const msg = req.flash("msg");
    res.render("forgotPassword/forgotPassword", {
      req,
      msg,
    });
  },

  handle: async (req, res) => {
    //validate
    const email = req.body.email;
    const provider = await Provider.findOne({ where: { name: "email" } });
    const user = await User.findOne({
      where: { email, provider_id: provider.id },
    });
    const body = await req.validate(req.body, {
      email: string()
        .required("Vui lòng nhập email")
        .email("Email không đúng định dạng")
        .test("check-exist", "Email không khớp với hệ thống", async () => {
          const provider = await Provider.findOne({ where: { name: "email" } });
          const user = await User.findOne({
            where: { email, provider_id: provider.id },
          });
          return user;
        }),
    });

    //send mail
    if (body) {
      const reset_token = md5(Math.random() + new Date().getTime());
      let expired_token = new Date().getTime();
      expired_token = expired_token + 15 * 60 * 1000;
      console.log(expired_token);

      await User.update(
        { reset_token, expired_token },
        { where: { email, provider_id: provider.id } }
      );

      ls.set("email", email);
      req.flash(
        "msg",
        "Bạn nhập email thành công. Vui lòng kiểm tra gmail của bạn!"
      );
      sendMail(
        email,
        "Chào bạn! Chúng tôi gửi bạn form đặt lại mật khẩu",
        "http://localhost:3000/reset-password"
      );
    }

    res.redirect("/forgot-password");
  },
};
