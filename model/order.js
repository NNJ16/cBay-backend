const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
     orderId : "String",
     orderUid : "String",
     orderName : "String",
     qty : "String",
     description : "String",
     orderAddress : "String",
     city : "String",
     zipcode : "String",
     province : "String",
     orderPrice : "String",
     orderDate : "String",
     orderStatus:"String"
});


module.exports = Order = mongoose.model("Order",OrderSchema);