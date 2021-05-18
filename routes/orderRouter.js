const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();
const Order = require("../model/order");
const orderid = require("orderid");
const connectDB = require("../config/database");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

connectDB();

Router.post("/addOrder",(req,res)=>{
    const id = orderid.v4();
    const orderName = req.body.orderName;
    const orderAddress = req.body.orderAddress;
    const orderDate = req.body.orderDate;
    const description = req.body.description;
    const orderPrice = req.body.orderPrice;
    const orderStatus = req.body.orderStatus;


    const order = new Order({
        orderId : id,
        orderName : orderName,
        orderAddress : orderAddress,
        orderDate : orderDate,
        description: description,
        orderPrice: orderPrice,
        orderStatus:orderStatus,

    });

    Order.save(err => {
        console.log(err);
        if (err) return res.status(500).send(err);
        return res.status(200).send(order)
    });
    console.log("Order Added Successfully..");
});

Router.get("/getOrders",(req,res)=>{
    user.find((err,result)=>{
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
    const orderName = req.body.orderName;
    const orderAddress = req.body.orderAddress;
    const oderDate = req.body.oderDate;
    const description = req.body.description;
    const oderPrice = req.body.oderPrice;
    const orderStatus = req.body.orderStatus;

    const query = {orderId:orderId};

    User.findOneAndUpdate(query,{$set:{
        orderId : orderId,
        orderrName : orderName,
        orderAddress : orderAddress,
        oderDate : oderDate,
        description: description,
        oderPrice: oderPrice,
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

    User.findOneAndDelete(query,(err,result)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(result);
    });
    console.log("Order Deleted Successfully..");
});

module.exports = Router;