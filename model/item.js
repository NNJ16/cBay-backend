const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
     itemId : "String",
     itemName : "String",
     imgURL : "String",
     description : "String",
     unitPrice:"Number"
});


module.exports = Item = mongoose.model("Item",ItemSchema);
