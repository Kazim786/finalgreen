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
    message: null,
    loginMessage: null
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
            req.session.username = savedUser.username
            console.log(req.session)
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

router.post("/login", async (req, res)=>{
  console.log(req.body)
  const passwordEnteredByUser = req.body.password
  const usernameEnteredByUser = req.body.username
  let persistedUser = await db.User.findOne({
    where: {
      username: usernameEnteredByUser
    }
  });

  if(persistedUser) {
    bcrypt.compare(passwordEnteredByUser, persistedUser.password, function(err, isMatch) {
      if (err) {
        throw err
      } else if (!isMatch) {
        res.render("index", { message: null, loginMessage: 'Incorrect username or password' });
       
      } else {

        req.session.username = usernameEnteredByUser
        res.redirect('/market')
      }
    })
  }
})
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
