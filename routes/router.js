const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();
const Item = require("../model/item");
const Order = require("../model/order");
const User = require("../model/user");
const uuid = require("uuid");
const connectDB = require("../config/database");
const order = require("../model/order");

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



//Order Part

Router.post("/addOrder",(req,res)=>{
    const id = uuid.v4();
    const orderUid = req.body.orderUid;
    const orderName = req.body.orderName;
    const qty = req.body.qty;
    const description = req.body.description;
    const orderAddress = req.body.orderAddress;
    const city = req.body.city;
    const zipcode = req.body.zipcode;
    const province = req.body.province;
    const orderPrice = req.body.orderPrice;
    const orderDate = req.body.orderDate;
    const orderStatus = req.body.orderStatus;


    const order = new Order({
        orderId : id,
        orderUid : orderUid,
        orderName : orderName,
        qty : qty,
        description: description,
        orderAddress : orderAddress,
        city : city,
        zipcode : zipcode,
        province : province,
        orderPrice: orderPrice,
        orderDate : orderDate,
        orderStatus:orderStatus,

    });

    order.save(err => {
        console.log(err);
        if (err) return res.status(500).send(err);
        return res.status(200).send(order)
    });
    console.log("Order Added Successfully..");
});

Router.get("/getOrders",(req,res)=>{
    Order.find((err,result)=>{
        if(err){
            console.log(err);
        }else{
            const orders = result;
           res.send(orders);
        }
    });
});


Router.put("/updateOrder",(req,res)=>{
    const orderId =  req.body.orderId;
    const orderUid = req.body.orderUid;
    const orderName = req.body.orderName;
    const qty = req.body.qty;
    const description = req.body.description;
    const orderAddress = req.body.orderAddress;
    const city = req.body.city;
    const zipcode = req.body.zipcode;
    const province = req.body.province;
    const orderPrice = req.body.orderPrice;
    const orderDate = req.body.orderDate;
    const orderStatus = req.body.orderStatus;

    const query = {orderId:orderId};

    Order.findOneAndUpdate(query,{$set:{
        orderId : id,
        orderUid : orderUid,
        orderName : orderName,
        qty : qty,
        description: description,
        orderAddress : orderAddress,
        city : city,
        zipcode : zipcode,
        province : province,
        orderPrice: orderPrice,
        orderDate : orderDate,
        orderStatus:orderStatus,
    }},(err)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(orderId)
    });
    console.log("Order Updated Successfully..");
});

Router.delete("/deleteOrder",(req,res)=>{
    const orderId =  req.body.orderId;
    const query = {orderId: orderId};

    Order.findOneAndDelete(query,(err,result)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(result);
    });
    console.log("Order Deleted Successfully..");
});




//User Part


Router.post("/addUser",(req,res)=>{
    const id = uuid.v4();
    const userName = req.body.userName;
    const userAddress = req.body.userAddress;
    const userEmail = req.body.userEmail;
    const userPw = req.body.userPw;
    const userPhone = req.body.userPhone;


    const user = new User({
        userId : id,
        userName : userName,
        userAddress : userAddress,
        userEmail : userEmail,
        userPw: userPw,
        userPhone: userPhone

    });

    user.save(err => {
        console.log(err);
        if (err) return res.status(500).send(err);
        return res.status(200).send(user)
    });
    console.log("User Added Successfully..");
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
    const userName = req.body.userName;
    const userAddress = req.body.userAddress;
    const userEmail = req.body.userEmail;
    const userPw = req.body.userPw;
    const userPhone = req.body.userPhone;

    const query = {userId:userId};

    User.findOneAndUpdate(query,{$set:{
            userId : userId,
            userName : userName,
            userAddress : userAddress,
            userEmail : userEmail,
            userPw: userPw,
            userPhone: userPhone
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