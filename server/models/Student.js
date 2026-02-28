const mongoose = require("mongoose");

const studentschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    rollnumber:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    totalClasses:{
        type: String,
        required: Number
    },
    AttendedClasses:{
        type: Number,
        required: true
    },
},{timestamps: true});

module.exports = mongoose.model("Student",studentschema);