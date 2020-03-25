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
    message: ""
  });
});

///uses astnce  await///

///azams class///

///checks password and username
router.post("/", async (req, res) => {
  let username = req.body.username; ///get username
  let password = req.body.password; ///get password

  let user = await db.User.findOne({
    where: {
      username: username
    }
  });
  if (user) {
    ////user exists
    ///compare the password given and checks if taken
    bcrypt.compare(password, Users.password, (error, result) => {
      ///if not taken then send user to market page
      if (result) {
        if (req.session) {
          ///creates a session
          req.session.user = { userid: Users.id };
          res.redirect("/current");
        }
        ///if password is wrong
      } else {
        res.render("/index", { message: "password/username is wrong" });
      }
    });
    ///if username is wrong
  } else {
    res.render("/index", { message: "password/username is wrong" });
  }
});

///register and check if username is used////encyprt and save passwords
router.post("/register", async (req, res) => {
  let name = req.body.name;
  let username = req.body.username;
  let body = req.body.content;
  let password = req.body.password;
  let address = req.body.address;

  let persistedUser = await db.User.findOne({
    where: {
      username: username
    }
  });
  ///if username is not used then enter a new one///
  if (persistedUser == null) {
    ///added hash to encrypt password///
    bcrypt.hash(password, SALT_ROUNDS, async (error, hash) => {
      ///if error message will display
      if (error) {
        res.render("index", { message: "error making username" });
      } else {
        ///if no error you wall make user
        let user = db.User.build({
          username: username,
          password: hash
        });
        let savedUser = await user.save();
        ///if username is used redirect to same page and display message///

        if (savedUser != null) {
          if(req.session) {
            req.session.userName = savedUser.userName
          }
          res.redirect("current");
        } else {
          res.render("index", { message: "username is taken" });
        }
      }
    });
  } else {
    res.render("index", { message: "username is taken" });
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
