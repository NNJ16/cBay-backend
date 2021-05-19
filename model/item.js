const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
     itemID : "String",
     itemName : "String",
     imgURL : "String",
     description : "String",
     price:"Number"
});

module.exports = Item = mongoose.model("Item",ItemSchema);
