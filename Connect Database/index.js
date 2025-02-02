const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3002;

app.get("/", (req, res)=> {
    res.send("<h1>Welcome to home page</h1>")
})

// mongoose.connect('mongodb://127.0.0.1:27017/testProductDB')
// .then(()=> console.log("DB is connected"))
// .catch((error) => {
//     console.log("DB is not connected")
//     console.log(error);
//     process.exit(1);
// }) 

// another away connected mongoose use async and waite 
const connectDB = async () => {
    try {
      await  mongoose.connect('mongodb://127.0.0.1:27017/testProductDB');
        console.log("DB is connected");
    } catch (error) {
        console.log("DB is not connected");
        console.log(error.message);
        process.exit(1);
    }
}


app.listen(PORT, async ()=>{ 
    console.log(`Server is runing at http://localhost:${PORT}`);
    await connectDB();
})