const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true
  },
  facultyName: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  expiryTime: {
    type: Date,
    required: true
  },
  nonce: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
  ,

  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  radius: {
    type: Number, // meters
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);