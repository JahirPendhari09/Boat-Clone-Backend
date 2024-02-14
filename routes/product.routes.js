const express = require("express");
const {AirdopesModel } = require("../model/Airdopes.model");

const productRoutes = express.Router();

productRoutes.get("/", async(req,res)=>{
    try{
        let filter = {};
        let sort = {};
        
        // Search by name
        if(req.query.name){
            filter.name = { $regex: req.query.name, $options: 'i' }; 
        }

        // Sorting by price
        if(req.query.sortByPrice){
            sort.price = req.query.sortByPrice === 'asc' ? 1 : -1;
        }

        const products = await AirdopesModel.find(filter).sort(sort);
        res.status(200).send({products});

    }catch(err){
        res.status(500).send({"error":err})
    }
})

productRoutes.post("/create", async(req,res)=>{

    try{
        // const product = new AirdopesModel(req.body)
        // await product.save();
        const products = req.body; // Assuming req.body is an array of products

        // Using insertMany to insert multiple products at once
        const insertedProducts = await AirdopesModel.insertMany(products);

        res.status(201).send({"msg":"New product has been Added","new product":req.body})

    }catch(err){
        res.status(500).send({"error":err})
    }
})

productRoutes.patch("/update/:id", async(req,res)=>{
    const {id}= req.params

    try{
        const product = await AirdopesModel.findOne({_id:id})
        if(!product) {
            res.status(400).send({"msg":`The product id ( ${id} )is Incorrect`})
        }else{

            await AirdopesModel.findByIdAndUpdate({_id:id},req.body)

            res.status(201).send({"msg":`This Product has been updated id ( ${id} )`})
        }

    }catch(err){
        res.status(500).send({"error":err})
    }
})
productRoutes.delete("/delete/:id", async(req,res)=>{
    const {id}= req.params

    try{
        const product = await AirdopesModel.findOne({_id:id})
        if(!product) {
            res.status(400).send({"msg":`The product id ( ${id} ) is Incorrect`})
        }else{

            await AirdopesModel.findByIdAndDelete({_id:id})

            res.status(201).send({"msg":`This Product has been Deleted id ( ${id} )`})
        }

    }catch(err){
        res.status(500).send({"error":err})
    }
})


module.exports ={productRoutes}