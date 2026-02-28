const mongoose =  require("mongoose");
require("dotenv").config();
const connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected");
    } catch (error) {
        console.error("Mongodb connection failed");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connection;