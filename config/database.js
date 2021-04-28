const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/cbaydb";

const connectDB = async ()=>{
    await mongoose.connect(URI,{useNewUrlParser: true,  useUnifiedTopology: true});
    console.log("Database Connected");
}

module.exports = connectDB;