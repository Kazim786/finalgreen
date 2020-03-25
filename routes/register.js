const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let db = require("../models");
var io = require("socket.io")();


router.get("/register", (req, res) => {
    res.render("register", {
        pageTitle: "register"
    });
});

module.exports = router