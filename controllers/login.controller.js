module.exports = {
  login: async (req, res) => {
    const error = req.flash("error");
    if (req.user) {
      res.redirect("/");
    }
    res.render("auth/login", {
      error,
    });
  },
};
