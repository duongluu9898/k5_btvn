const bcrypt = require("bcrypt");
const { User, Provider } = require("../models/index");
const { string } = require("yup");
module.exports = {
  index: (req, res) => {
    const msg = req.flash("msg");
    const msg1 = req.flash("msg1");
    res.render("auth/register", {
      msg,
      req,
      msg1,
    });
  },

  handleRegister: async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const provider = await Provider.findOne({ where: { name: "email" } });
    const user = await User.findOne({
      where: { email, provider_id: provider.id },
    });

    //validate
    const body = await req.validate(req.body, {
      email: string()
        .required("Vui lòng nhập email")
        .email("Email không đúng định dạng"),

      password: string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải ít nhất 6 kí tự"),
      reTypePassword: string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải ít nhất 6 kí tự")
        .test("check-password", "Mật khẩu phải giống nhau", async () => {
          const password = req.body.password;
          const reTypePassword = req.body.reTypePassword;
          if (password === reTypePassword) {
            return true;
          }
          if (password !== reTypePassword) {
            return false;
          }
        }),
    });

    console.log(body);

    if (user?.email) {
      req.flash("msg1", "Email đã tồn tại");
      return res.redirect("/auth/register");
    }

    // check
    if (body) {
      const hashedPassword = await bcrypt.hash(password[0], 10);
      await User.create({
        email,
        password: hashedPassword,
        provider_id: 1,
      });
      req.flash("msg", "Đăng ký thành công");
      return res.redirect("/auth/register");
    }
    res.redirect("/auth/register");
  },
};
