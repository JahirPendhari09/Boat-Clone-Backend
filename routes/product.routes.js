const express = require("express");
const {AirdopesModel } = require("../model/Airdopes.model");

const productRoutes = express.Router();

productRoutes.get("/", async(req,res)=>{
    try{
        const product = await AirdopesModel.find();
        res.status(200).send({product})

    }catch(err){
        res.status(500).send({"error":err})
    }
})

productRoutes.post("/create", async(req,res)=>{

    try{
        const product = new AirdopesModel(req.body)
        await product.save();

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