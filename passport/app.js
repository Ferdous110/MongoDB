
const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//  base url 
app.get("/", (req, res)=> {
    res.render("index")
})

// register : post 
app.post("/register", (req, res)=> {
    try {
        res.status(201).send("User is created");
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

