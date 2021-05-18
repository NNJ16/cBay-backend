const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();
const User = require("../model/user");
const uid = require("uid");
const connectDB = require("../config/database");
const user = require("../model/user");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

connectDB();

Router.post("/addUser",(req,res)=>{
    const id = uid.v4();
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

    User.save(err => {
        console.log(err);
        if (err) return res.status(500).send(err);
        return res.status(200).send(user)
    });
    console.log("User Added Successfully..");
});

Router.get("/getUsers",(req,res)=>{
    user.find((err,result)=>{
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