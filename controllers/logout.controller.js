module.exports = {
  index: (req, res) => {
    console.log(req.session.user);

    if (req.session.user) {
      req.session.user = null;
      return res.redirect("/auth/login");
    }
    res.render("auth/login", {
      layout: "auth/layout",
    });
  },
};
