const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();
const Item = require("../model/item");
const User = require("../model/user");
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
    const price = req.body.price;
    const userId = req.body.userId;

    const item = new Item({
        itemID : id,
        itemName : itemName,
        imgURL : imgURL,
        description : description,
        price: price,
        userId: userId
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

Router.post("/items",(req,res)=>{
    const userId = req.body.userId;
    Item.find({userId: userId},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            const items = result;
            res.send(items);
        }
    });
});

Router.put("/updateItem",(req,res)=>{
    const itemID =  req.body.itemID;
    const itemName = req.body.itemName;
    const imgURL = req.body.imgURL;
    const description = req.body.description;
    const price = req.body.price;
    const userId = req.body.userId;

    const query = {itemID:itemID};
    Item.findOneAndUpdate(query,{$set:{
            itemName : itemName,
            imgURL : imgURL,
            description : description,
            price: price,
            userId: userId
    }},(err)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(itemID)
    });
});

Router.delete("/deleteItem",(req,res)=>{
    const itemID =  req.body.itemID;
    const query = {itemID: itemID};
    Item.findOneAndDelete(query,(err,result)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(result);
    });
});

Router.post("/addUser",(req,res)=>{
    const id = uuid.v4();
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const type = req.body.type;

    const user = new User({
        userId : id,
        name : name,
        email : email,
        password: password,
        phone: phone,
        type : type
    });

    user.save(err => {
        console.log(err);
        if (err) return res.status(500).send(err);
        return res.status(200).send(user)
    });
    console.log("User Added Successfully..");
});

Router.post("/login",(req,res)=>{
    const email = req.body.email;
    User.find({email:email},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            const user = result;
            res.send(user);
        }
    });
});
Router.get("/getUsers",(req,res)=>{
    User.find((err,result)=>{
        if(err){
            console.log(err);
        }else{
            const users = result;
            res.send(users);
        }
    });
});

Router.put("/updateUser",(req,res)=>{
    const userId =  req.body.userId;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const type = req.body.type;

    const query = {userId:userId};

    User.findOneAndUpdate(query,{$set:{
            name : name,
            email : email,
            password: password,
            phone: phone,
            type : type
        }},(err)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(userId)
    });
    console.log("User Updated Successfully..");
});

Router.delete("/deleteUser",(req,res)=>{
    const userId =  req.body.userId;
    const query = {userId: userId};

    User.findOneAndDelete(query,(err,result)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(result);
    });
    console.log("User Deleted Successfully..");
});

module.exports = Router;