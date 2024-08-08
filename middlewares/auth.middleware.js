module.exports = (req, res, next) => {
  if (!req.session.user) {
    req.flash("msg", "Bạn cần đăng nhập để truy cập trang này");
    return res.redirect("/auth/login");
  }
  next();
};
