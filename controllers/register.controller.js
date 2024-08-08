const { User } = require("../models/index");
module.exports = {
  index: (req, res) => {
    const msg = req.flash("msg");
    res.render("auth/register", {
      layout: "auth/layout",
      msg,
    });
  },

  handleRegister: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (email === user.email) {
      req.flash("msg", "Email đã tồn tại");
      return res.redirect("/register");
    }
    res.redirect("/register");
  },
};
