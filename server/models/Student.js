const mongoose = require("mongoose");

const studentschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    totalClasses: {
      type: Number,
      required: true,
    },
    attendedClasses: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one User → one Student
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentschema);
