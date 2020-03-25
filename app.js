const express = require("express");
const app = express();
var io = require('socket.io')();
const db = require('./models');
const PORT = process.env.PORT || 5502;
const bcrypt = require('bcrypt')
const session = require('express-session')
const index = require('./routes/index')
const formidable = require('formidable')
const path = require('path')
const frontpage = require('./routes/frontpage')
// const bodyParser = require("body-parser");
const bodyParser = require("body-parser");
const pgp = require('pg-promise')()
const CONNECTION_STRING = 'postgres://localhost:5432/green'
// let auth = require("./auth");



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))// let sessions = require("express-session");
// let cookieParser = require("cookie-parser");

  const VIEWS_PATH =path.join(__dirname,'/views')

///to get base direcctory for uploads
global.__basedir = __dirname;
const db2 = pgp(CONNECTION_STRING)

app.post('/index', (req, res) => {
  let username = req.body.username
  let password = req.body.password

  db.oneOrNone('SELECT id FROM Users where username = $1', [username])
  .then((User) => {
    if(User){
      res.render('register', {message: 'User name already exists!'})
    }

    else{
      db2.none('INSERT INTO Users(username,password) VALUES($1,$2)', [username,password])
      .then(() => {
        res.send('SUCCESS')
      })
    }

  })
})


//I did the top section so far from azams course

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use('/uploads',express.static("uploads"));
app.use(index);
app.use(frontpage);
app.use(require("./routes/register"));
app.use(require("./routes/registerOrgs"));
app.use(require("./routes/current"));
app.use(require("./routes/api"));
app.use(require("./routes/donate"));
// app.use(require("./routes/admin"));
app.use(require("./routes/market"));
////install express-session and bcrypt!!!
app.use(session({
secret:'secret',///hash/salt value
resave:true,///if the session is changing you are saving it
saveUninitialized:false////only saves if there is something to save

}))


// ///checks password and username
// app.post('/', async (req,res) => {
//   let username = req.body.username; ///get username
//   let password = req.body.password;///get password

//  let user= await db.Users.findOne({
// where:{

//   username:username
// }

//   })
// })
// if(user != null){////user exists
//   ///compare the password given and checks if taken
//   bcrypt.compare(password, Users.password,(error,result) => {
//     ///if not taken then send user to market page
//     if(result){
// if(req.session){///creates a session
//   req.session.user = {userid: Users.id}
//   res.redirect('/current')
// }
// ///if password is wrong
//     } else{
//       res.render('/',{message:'password/username is wrong'})
//     }
//   })
// ///if username is wrong

// }else {
//         res.render("/", { message: "password/username is wrong" });

// }




///register and check if username is used////encyprt and save passwords
// app.post('/',async (req,res) => {
//   let name = req.body.name
//   let username = req.body.username
//   let body = req.body.content
//   let password = req.body.password
//   let address = req.body.address

//   let prsistedUser = await db.Users.findOne({
// where: {
//   username: username
// }

//   })
// ///if username is not used then enter a new one///
//   if (prsistedUser == null){
// ///added hash to encrypt password///
// bcrypt.hash(password,SALT_ROUNDS, async (error,hash) => {
//   ///if error message will display
//   if(error){
//     res.render('/', {message:"error making username"})
//   }else{
//     ///if no error you wall make user
//  let user = db.Users.build({
//       username:username,
//       password:hash
//     })
//       let savedUser = await Users.save()
//     ///if username is used redirect to same page and display message///

// if(savedUser != null){
//   res.redirect('/')
// }  else {
//   res.render('/',{message:"username is taken"})
// }
//   }
// }) }  else {
//     res.render('/', { message: "username is taken" })

//   } 

// })
 
//////////////////

// app.get("/error", (req, res) => {
//   res.send("error");
// });


// io.attach(server);
// io.on('connection', function (socket) {
//   socket.on('postMessage', function (data) {
//     io.emit('updateMessages', data);
//   });
// });



db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
})




