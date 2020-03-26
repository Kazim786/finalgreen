function authenticateOrg(req, res, next) {
  console.log('inside of auth middleware for org', req.session)

    if(!req.session) {
      res.redirect("/")
      return
    }
    
    if (req.session.username && req.session.accountType && req.session.accountType === 'org') {
      next();
    } else {
      res.redirect("/");
    }

  }

module.exports = authenticateOrg
