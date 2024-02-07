const mongoose = require("mongoose");

const airdropsSchema = mongoose.Schema({
    images:Array,
    title:String,
    rating:Number,
    salePrice :Number,
    regularPrice:Number,
    discount:Number,
    features:Array,
    playback:Number

},{versionKey:false})

const AirdopesModel = mongoose.model("airdrop",airdropsSchema);

module.exports ={AirdopesModel}