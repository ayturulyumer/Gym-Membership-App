const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  workouts: {
    type: Number,
    required: false,
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
