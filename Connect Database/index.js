const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3002;

app.use(express.json());  // Middleware
app.use(express.urlencoded({extended: true}));

// create product schema 

const productsSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
    },
    price:  {
        type: Number,
        required: true,
    },
    description:  {
        type: String,
        required: true,
    },
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

app.post("/products", async (req, res)=> {
   try {
    // get data from request body
     const newProduct = new Product({
        title: req.body.title,
        price:  req.body.price,
        description: req.body.description
     })
     const productData = await newProduct.save();

     res.status(201).send(productData);
   } catch (error) {
    res.status(500).send({ message: error.message });
   }
});

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
    console.log(` Server is runing at http://localhost:${PORT} `);
    await connectDB();
});


// NoSQl 
// DATABASE => collections => document 