// bcrypt password 
const bcrypt = require('bcrypt');
const saltRounds = 10;
// passport && session 
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');


const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const app = express();
require("./config/database")
const User = require("./models/user.models")
require("dotenv").config();

app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONG_URL,
    collectionName: "sessions";
  }),
 // cookie: { secure: true }
}))

//  base url 
app.get("/", (req, res)=> {
    res.render("index")
})

// register : post 
app.post("/register", async (req, res)=> {
    try {
        const user = await User.findOne({username: req.body.username});
        if(user) return res.status(400).send("user allready exists");
        bcrypt.hash(req.body.password, saltRounds, async (err, hash)=> {
            const newUser = new User({
                username: req.body.username,
                password: hash
            });
        await newUser.save();
        res.status(201).redirect("/login");
        });
       
    } catch (error) {
        res.status(500).send(error.message);
    }
})
// register : get 
app.get("/register", (req, res)=> {
    res.render("register")
})
// login : get 
app.get("/login", (req, res)=> {
    res.render("loging")
})

// login : post 
app.post("/register", (req, res)=> {
    try {
        res.status(200).send("User is logged in");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// profile protected route 
app.get("/profile", (req, res)=> {
    res.render("profile")
})

// logout route 
app.get("/logout", (req, res) => {
    res.redirect("/");
})



module.exports = app

