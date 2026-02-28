const mongoose = require("mongoose");

const studentschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    rollNumber:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    totalClasses:{
        type: Number,
        required: true
    },
    AttendedClasses:{
        type: Number,
        required: true
    },
},{timestamps: true});

module.exports = mongoose.model("Student",studentschema);