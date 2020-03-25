const express = require("express");
const router = express.Router();
let db = require("../models");
let bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
var io = require("socket.io")();

const session = require("express-session");

router.get("/", (req, res) => {
    res.render("frontpage", {
        pageTitle: "frontpage",
        message: ""
    });
}); 

module.exports = router;