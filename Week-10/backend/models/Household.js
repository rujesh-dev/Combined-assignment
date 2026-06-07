const mongoose = require('mongoose');


const householdSchema = new mongoose.Schema({
  name: String,           // required, 3-30 chars
  inviteCode: String,     // unique, 6 chars uppercase
  members: [mongoose.Schema.ObjectId],  // user references
  wasteScore: Number,     // 0-100, default 0
  createdAt: Date
})

module.exports = mongoose.model("household", householdSchema);