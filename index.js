const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { productRoutes } = require("./routes/product.routes");

const app= express();

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use("/products",productRoutes);

app.listen(process.env.PORT , async()=>{
    try{
        connection
        console.log("MongoDB is Connected")
        console.log("Server is Running")
    }catch(err){
        console.log(err)
    }
})

