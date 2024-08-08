const { User } = require("../models/index");
module.exports = {
  index: (req, res) => {
    const msg1 = req.flash("msg1");
    res.render("auth/register", {
      layout: "auth/layout",
      msg1,
    });
  },

  handleRegister: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(email, user.email);

    if (email === user.email) {
      req.flash("msg1", "Email đã tồn tại");
      return res.redirect("/auth/register");
    }
    res.redirect("/auth/login");
  },
};
