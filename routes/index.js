const express = require("express");
const router = express.Router();
let db = require("../models");
let bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
var io = require("socket.io")();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const session = require("express-session");

router.get("/index", (req, res) => {
  res.render("index", {
    pageTitle: "index",
    userLoginMessage: null,
    orgLoginMessage: null,
    loggedIn: req.session.userId? true : false
  });
});

///uses astnce  await///

///azams class///

///register and check if username is used////encyprt and save passwords
router.post("/register", async (req, res) => {
  let name = req.body.name;
  let username = req.body.username;
  let body = req.body.content;
  let password = req.body.password;
  let address = req.body.address;
  const accountType = req.body.account_type;

  let persistedUser = null

  if (accountType === "user") {
    persistedUser = await db.User.findOne({
      where: {
        username: username
      }
    });
  }
  if (accountType === "org") {
    persistedUser = await db.Admin.findOne({
      where: {
        username: username
      }
    });
  }

  if (!persistedUser) {
   
    bcrypt.hash(password, SALT_ROUNDS, async (error, hash) => {
      
      let user = null;

      if (accountType === "user") {
        user = db.User.build({
          username: username,
          password: hash
        });
      }
      if (accountType === "org") {
        user = db.Admin.build({
          username: username,
          password: hash
        });
      }

      let savedUser = await user.save();

      if (savedUser && req.session) {
        req.session.username = savedUser.username;
        req.session.accountType = accountType;
        req.session.userId = savedUser.id
        req.session.save()
        if (accountType === "org") {
          res.redirect("market");
          return;
        }

        res.redirect("current");
        return;
      }

      if(accountType === "org"){
        res.render("registerOrgs", { message: "something went wrong, try again" });
        return
      }

      res.render("register", { message: "something went wrong, try again" });
      
    });
  } else {
    if(accountType === "org"){
      res.render("registerOrgs", { message: "username is taken" });
      return
    }

    res.render("register", { message: "username is taken" });
    
  }
});

router.get("/logout", async (req, res) => {
  req.session.userName = null
  req.session.userId = null
  req.session.accountType = null
  req.session.save()
  res.redirect("/index")
})

router.post("/login", async (req, res) => {
  const passwordEnteredByUser = req.body.password;
  const usernameEnteredByUser = req.body.username;
  const accountType = req.body.account_type
  let persistedUser = null
  if(accountType === 'org'){
    persistedUser = await db.Admin.findOne({
      where: {
        username: usernameEnteredByUser
      }
    });
  
  }

  if(accountType === 'user'){
    persistedUser = await db.User.findOne({
      where: {
        username: usernameEnteredByUser
      }
    });
  
  }
  
  if (persistedUser) {
    bcrypt.compare(passwordEnteredByUser, persistedUser.password, function(
      err,
      isMatch
    ) {
      if (err) {
        throw err;
      } else if (!isMatch) {
        // res.render("index", {
        //   message: null,
        //   message: "Incorrect username or password"
        // });
        if(accountType === 'org'){
          res.render("index", { orgLoginMessage: "Incorrect username or password", userLoginMessage: null, loggedIn: req.session.userId? true : false})
        }

        if(accountType === 'user'){
          res.render("index", { userLoginMessage: "Incorrect username or password", orgLoginMessage: null, loggedIn: req.session.userId? true : false })
        }
      } else {
        console.log('test')
        req.session.username = usernameEnteredByUser;
        req.session.accountType = accountType
        req.session.userId = persistedUser.id
        req.session.save()

        if(accountType === 'org'){
          res.redirect('/market')
        }

        if(accountType === 'user'){
          res.redirect('/current')
        }
      }
    });
  }
});
///azams class///

///uses promises////

// ///get all users//////
// router.get("/", (req, res) => {
//   db.User.FindAll({

//     include: [db.username,db.password]
//   })    .then(User => res.send(User))

// });

// /////done/////////
// ////create a user///

// router.post("/", (req,res) => {
//   let newUser = db.User.create({
//   name: req.body.name,
//   username: req.body.username,
//   body: req.body.content,
//   password: req.body.password,
//   address: req.body.address

//   }).then(newUser => res.send(newUser))
// })

// /////done/////////

// ////use password and username to login///
// router.post("/", (req, res) => {

//     let  username = req.body.username
//     let  body = req.body.content
//     let  password = req.body.password
//     let address = req.body.address
// console.log(username)
// console.log(password)
// })

///old code///

// router.post("/", (req, res) => {
//   let name = req.body.name;
//   let username = req.body.username;
//   let body = req.body.content;
//   let password = req.body.password;
//   let address = req.body.address;
//   db.none(
//     "INSERT INTO Users(name, username, body, password, address) VALUES($1, $2, $3, $4, $5)",
//     [name, username, body, password, address]
//   )
//   res.send('good sent')
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch(err => {
//       res.send(err);
//     });
// });

///////////

module.exports = router;
