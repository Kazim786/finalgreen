function authenticateUser(req, res, next) {
    console.log('inside of auth middleware for user', req.session)

    if(!req.session) {
      res.redirect("/")
      return
    }
    
    if (req.session.username && req.session.accountType && req.session.accountType === 'user') {
      next();
    } else {
      res.redirect("/");
    }

  }

module.exports = authenticateUser
