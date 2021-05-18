const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
     userId : "String",
     userName : "String",
     userAddress : "String",
     userEmail : "String",
     userPw: "String",
     userPhone: "String"
});


module.exports = User = mongoose.model("User",UserSchema);