const mongoose = require('mongoose');

const intemSchema = new mongoose.Schema({
  householdId: mongoose.Schema.ObjectId,  // required
  addedBy: mongoose.Schema.ObjectId,      // user reference
  name: {
    type: String,
    required: true
  },           // required
  category: {
    type: String,
    enum: ["produce", "dairy", "meat", "pantry", "frozen", "other"]
  },       // enum: produce, dairy, meat, pantry, frozen, other
  quantity: {
    type: Number,
    default: 1
  },    // default 1
  expiryDate: {
    type: Date,
    required: true
  },       // required
  status: {
    type: String,
    enum: ["fresh", "expiring-soon", "expired", "used", "wasted"]
  },         // enum: fresh, expiring-soon, expired, used, wasted
  createdAt: Date,
  updatedAt: Date
})

module.exports = mongoose.model("item", intemSchema);