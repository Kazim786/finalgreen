function authenticate(req, res, next) {
    if (req.session) {
      if (req.session.userName) {
        next();
      } else {
        res.redirect("/");
      }
    } else {
      res.redirect("/");
    }
  }

module.exports = authenticate