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

module.exports = router