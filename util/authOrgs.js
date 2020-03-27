function authenticateOrg(req, res, next) {
  console.log('inside of auth middleware for org', req.session)

    if(!req.session) {
      res.redirect("/index")
      return
    }
    
    if (req.session.username && req.session.accountType && req.session.accountType === 'org') {
      next();
    } else {
      res.redirect("/index");
    }

  }

module.exports = authenticateOrg
