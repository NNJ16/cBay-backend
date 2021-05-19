const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId : "String",
    name : "String",
    email : "String",
    password: "String",
    phone: "String",
    type:"String"
});

module.exports = User = mongoose.model("User",UserSchema);