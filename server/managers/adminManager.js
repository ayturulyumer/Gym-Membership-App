const Admin = require("../models/Admin.js");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.js");
const secretKey = process.env.SECRET_KEY;

exports.login = async ({ username, password }) => {
  const user = await Admin.findOne({ username });

  if (!user) {
    throw new Error("Invalid username or password !");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid username or password !");
  }

  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = await jwt.sign(payload, secretKey, { expiresIn: "2d" });

  const result = {
    _id: user._id,
    username: user.username,
    accessToken: token,
  };

  return result;
};
