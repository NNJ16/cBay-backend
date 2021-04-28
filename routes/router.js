const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();
const Item = require("../model/item");
const uuid = require("uuid");
const connectDB = require("../config/database");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

connectDB();

Router.post("/addItem",(req,res)=>{
    const id = uuid.v4();
    const itemName = req.body.itemName;
    const imgURL = req.body.imgURL;
    const description = req.body.description;
    const unitPrice = req.body.unitPrice;


    const item = new Item({
        itemId : id,
        itemName : itemName,
        imgURL : imgURL,
        description : description,
        unitPrice: unitPrice
    });

    item.save(err => {
        console.log(err);
        if (err) return res.status(500).send(err);
        return res.status(200).send(item)
    });
    console.log("Item Added Successfully..");
});

Router.get("/items",(req,res)=>{
    Item.find((err,result)=>{
        if(err){
            console.log(err);
        }else{
            const items = result;
           res.send(items);
        }
    });
});

Router.put("/updateItem",(req,res)=>{
    const itemId =  req.body.itemId;
    const itemName = req.body.itemName;
    const imgURL = req.body.imgURL;
    const description = req.body.description;
    const unitPrice = req.body.unitPrice;

    const query = {itemId:itemId};

    Item.findOneAndUpdate(query,{$set:{
            itemId : itemId,
            itemName : itemName,
            imgURL : imgURL,
            description : description,
            unitPrice: unitPrice
    }},(err)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(itemId)
    });
});

Router.delete("/deleteItem",(req,res)=>{
    const itemId =  req.body.itemId;
    const query = {itemId: itemId};
    Item.findOneAndDelete(query,(err,result)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(result);
    });
});

module.exports = Router;