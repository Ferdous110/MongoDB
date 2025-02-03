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
    rating:  {
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
// create product 
app.post("/products", async (req, res)=> {
   try {
    // get data from request body
     const newProduct = new Product({
        title: req.body.title,
        price:  req.body.price,
        rating:  req.body.rating,
        description: req.body.description
     })
     const productData = await newProduct.save();

     res.status(201).send(productData);
   } catch (error) {
    res.status(500).send({ message: error.message });
   }
});

// Read products

app.get("/products", async (req, res) => {
    try {
        const price = req.query.price;
        const rating = req.query.rating;
        let products
        if(price && rating){
             products = await Product.find({
                $and: [
                {price: {$gt: price}}, 
                {rating: {$gt: rating}}
        ]
            }).sort({price: 1});
        }else{
            products = await Product.find().sort({price: 1});
        }
        
        if(products) {
            res.status(200).send({
                success: true,
                message: "return all product",
                data: products
            });
        } else {
            res.status(404).send({
                success: false,
                message: "products not found"
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

// return a spacific product
app.get("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({_id: id});
        if(product) {
            res.status(200).send({
                success: true,
                message: "product was not found with this id",
                data: product
            });
        } else {
            res.status(404).send({
                success: false,
                message: "product not found"
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}) ;

// delete produtcs

app.delete("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete({_id: id});
        if(product) {
            res.status(200).send({
                success: true,
                message: "delete single product",
                data: product
            });
        } else {
            res.status(404).send({
                success: false,
                message: "product was not deleted with this id"
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}) ;

// update products

app.put("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedproduct = await Product.findByIdAndUpdate({_id: id},
            {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    description:req.body.description,
                    rating: req.body.rating
                }
            },
            {new: true}   
        );
        if(updatedproduct) {
            res.status(200).send({
                success: true,
                message: "update single product",
                data: updatedproduct
            });
        } else {
            res.status(404).send({
                success: false,
                message: "product was not updated with this id"
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}) ;

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

// post: /products => create a product 
// get: /product => return all the product
// get: /product/:id => return a spacific product 
// put: /product/:id => update a product based on id
// delete: /product/:id => delete a product based on id