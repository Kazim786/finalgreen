const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let db = require("../models");
const auth = require('../util/authOrgs')



// router.get("/market", (req, res) => {
//   res.render("market", {
//     pageTitle: "market"
//   });
// });




///get all items//////
router.get("/market", (req, res) => {
  db.items.findAll().then(items => res.render("market", { items: items }));
});



////post new item//////

router.post("/market", (req, res) => {
  console.log(req.body)

  let newItem = db.items
    .create({
      categories: req.body.category,
      amount: req.body.amount,
      imageUrl: req.body.imageurl,
      Description: req.body.description,
      item_Name: req.body.item,
      UserID: req.body.user,
      updatedAt: new Date(),
      CreatedAt: new Date()
    })
    .then(submitedItem => {


      db.items.findAll().then(items => {

        res.render("market", { items: items })
      })
    })
});

////done////



///deltel item//////

router.get("/market/:id", (req, res) => {
  console.log(` ID IS: ${req.params.id}`)
  db.items.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    console.log("I ran!")
    db.items.findAll().then(items => res.render("market", { items: items }));
      
  });
 });










module.exports = router