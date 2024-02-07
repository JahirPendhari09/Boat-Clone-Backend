const express = require("express");
const { AirdopesModel } = require("../model/Airdopes.model");

const airdropsRoutes = express.Router();

airdropsRoutes.get("/", async(req,res)=>{
    try{
        const airdrops = await AirdopesModel.find();
        res.status(200).send({airdrops})

    }catch(err){
        res.status(500).send({"error":err})
    }
})

airdropsRoutes.post("/create", async(req,res)=>{
    const {rating,title,salePrice,regularPrice,discount,features,playback,images } = req.body;

    try{
        const airdrops = new AirdopesModel({
            title,rating,salePrice,regularPrice,discount,features,playback,images
        })

        await airdrops.save();
        res.status(200).send({"msg":"New Airdrop Added","new Airdrops":req.body})
        res.status(200).send({airdrops})

    }catch(err){
        res.status(500).send({"error":err})
    }
})

module.exports ={airdropsRoutes}