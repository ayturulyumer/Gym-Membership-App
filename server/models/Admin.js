const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
