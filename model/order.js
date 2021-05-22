const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
     orderId : "String",
     orderUid : "String",
     username :"String",
     orderDesc : "Array",
     orderAddress : "String",
     city : "String",
     zipcode : "String",
     province : "String",
     orderPrice : "String",
     orderDate : "String",
     paymentType : "String",
     deliveryStatus:"String"
});


module.exports = Order = mongoose.model("Order",OrderSchema);