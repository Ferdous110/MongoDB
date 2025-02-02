const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3002;

// create product schema 
const productsSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// create product model 
const Product = mongoose.model("Products", productsSchema);

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

// another away connected mongoose use async and await
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

// NoSQl 
// DATABASE => collections  => document 