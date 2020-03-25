const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let db = require("../models");
const auth = require('../util/authMiddleware')


router.get("/market", auth, (req, res) => {
  res.render("market", {
    pageTitle: "market"
  });
});

module.exports = router