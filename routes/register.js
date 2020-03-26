const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let db = require("../models");
var io = require("socket.io")();

///renders page////
router.get("/register", (req, res) => {
    res.render("register", {
        pageTitle: "register",
        message: null
    });
});

// register user and org is in the index.js route

module.exports = router

