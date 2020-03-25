const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let db = require("../models");
var io = require("socket.io")();


router.get("/registerOrgs", (req, res) => {
    res.render("registerOrgs", {
        pageTitle: "registerOrgs"
    });
});


////add user and store onto database//////
router.post("/registerOrgs", (req, res) => {
    console.log(req.body)


    let newOrg = db.User
        .create({
            name: req.body.name,
            description: req.body.description,
            creditcard: req.body.creditcard,
            email: req.body.email,
            password: req.body.password,
            updatedAt: new Date(),
            CreatedAt: new Date()
        })
        .then(submitedOrg => {
           
              
                   
                        

            ////send user to index page////
            res.redirect("/market")

        }).catch((error) => {
            console.log(error)
        })

});





module.exports = router