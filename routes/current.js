const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let db = require('../models');

router.use(bodyParser.urlencoded({ extended: false }));


///parese json///
router.use(bodyParser.json())


///get all items//////
router.get("/current", (req, res) => {
db.items.findAll()
.then(items => res.send(items))
});

/////done/////////


////get item by id//////
router.get("/current/:id", (req, res) => {
  db.items.findAll({
    where: {
      id: req.params.id
    }
  }).then(items => res.send(items));
});
/////////done//////


////post new item//////

router.post("/current", (req, res) =>{
  let newItem = db.items.create({
    categories: req.body.category,
    amount: req.body.amount,
    imageUrl: req.body.imageurl,
    Description: req.body.description,
    item_Name: req.body.item,
    UserId: req.body.user,
    updatedAt: new Date(),
    CreatedAt: new Date()
  }).then(submitedItem => res.send(submitedItem))
});


////done////

///deltel item//////

router.get("/current/:id", (req, res) => {
  db.items.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("worked"));
});

module.exports = router