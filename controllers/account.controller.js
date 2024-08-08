module.exports = {
  index: async (req, res) => {
    const name = req.session.user.name;
    const email = req.session.user.email;

    await res.render("account/account", {
      layout: "auth/layout",
      name,
      email,
    });
  },
};
