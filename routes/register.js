const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let db = require("../models");
var io = require("socket.io")();

///renders page////
router.get("/register", (req, res) => {
    res.render("register", {
        pageTitle: "register"
    });
});

////add user and store onto database//////
router.post("/register", (req, res) => {
    console.log(req.body)
 

    let newUser= db.User
        .create({
            name: req.body.name,
            address: req.body.address,
            creditcard: req.body.creditcard,
            username: req.body.username,
            password: req.body.password,
            updatedAt: new Date(),
            CreatedAt: new Date()
        })
        .then(submitedUser=> {


            
////send user to index page////
                res.redirect("/index")
            
        }).catch ((error) => {
            console.log(error)
        })

});



module.exports = router

