const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let db = require('../models');
const formidable = require("formidable");

router.use(bodyParser.urlencoded({ extended: false }));


///parese json///
router.use(bodyParser.json())

///upload///
function uploadFile(req,callback){
console.log("upload file ran")
///uses formidable install in app.js and this file to get uploads
  new formidable.IncomingForm({uploadDir:"../uploads"})
    .parse(req)
    .on("fileBegin", (name, file) => {
      //allow you to change name of file//
file.path = __basedir + "/uploads" + file.name
    })

    .on("file", (name, file) => {
callback(file.name)

    })
}

router.post("/uploads", (req, res) => {
  console.log("hey")
uploadFile(req,(photoURL)=>{

res.render('routes/current',{imageUrl:photoURL})
})

})


///get all items//////
router.get("/current", (req, res) => {
db.items.findAll().then(items => res.render("current", { items: items }));
});

/////done/////////


////get item by id//////
// router.get("/current/:id", (req, res) => {
//   db.items.findAll({
//     where: {
//       id: req.params.id
//     }
//   }).then(items =>   res.render("/current", { items: items }))

// });
/////////done//////


////post new item//////

router.post("/current", (req, res) =>{
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
    

      db.items.findAll().then(items =>{
     
        res.render("current", { items: items })
      })
})
});

////done////






/////old code//////////

// router.get("/current", (req, res) => {
//   // res.render('current');
//   db.query('SELECT * FROM "items"')
//   .then(results => {
//     //results is an array of objects
//     console.log(results);
//     res.render("current", {
//       //render current page
//       Items: results
//     });
//   });
// });

// router.post("/current", (req, res) => {
//   let Itemname = req.body.Itemname;
//   let category = req.body.category;
//   let body = req.body.content;
//   let imgURL = req.body.imgURL;
//   let Amount = req.body.Amount;
//   let Description = req.body.Description;
//   db.none(
//     "INSERT INTO list(Itemname, category, body, imgURL, Amount,Description) VALUES($1, $2, $3, $4, $5,$6)",
//     [Itemname, category, body, imgURL, Amount, Description]
//   )
//     res.send('good sent')
//     .then(() => {
//       res.redirect("/current");
//     })
//     .catch(err => {
//       res.send(err);
//     });
// });
//////////////////////
module.exports = router;

