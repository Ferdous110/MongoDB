require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const md5 = require("md5");

const User = require("./models/user.model")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/view/index.html")
})

app.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            email: req.body.email,
            password: md5( req.body.password)
        }
        );
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

app.post("/login", async (req, res) => {
   try {
    const  email = req.body.email;
    const  password = md5(req.body.password);
    const user = await User.findOne({email: email});
    if(user && user.password === password){
        res.status(200).json({ status: "valid User"});
    } else{
        res.status(404).json({ status: "not valid user"})
    }
   } catch (error) {
    res.status(500).json(error.message);
   }
})



//route not found 
app.use (( req, res, next) => {
    res.status(404).json({
        message: "route not found ",
    });
});
// handling the server  error 
app.use ((err, req, res, next) => {
    res.status(500).json({
        message: "something is broke ",
    });
});


const connectDB = async () => {
    try {
      await  mongoose.connect('mongodb://127.0.0.1:27017/website-authentication');
        console.log("DB is connected");
    } catch (error) {
        console.log("DB is not connected");
        console.log(error.message);
        process.exit(1);
    }
}

app.listen(PORT, async ()=>{ 
    console.log(` Server is runing at http://localhost:${PORT} `);
    await connectDB();
});
