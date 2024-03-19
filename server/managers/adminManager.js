const Admin = require("../models/Admin.js");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.js");
const secretKey = process.env.SECRET_KEY;

exports.login = async ({ email, password }) => {
  const user = await Admin.findOne({ email });

  if (!user) {
    throw new Error("Грешен имейл или парола");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Грешен имейл или парола!");
  }

  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = await jwt.sign(payload, secretKey, { expiresIn: "2d" });

  const result = {
    _id: user._id,
    email: user.email,
    accessToken: token,
  };

  return result;
};
