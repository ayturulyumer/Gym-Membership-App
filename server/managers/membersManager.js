const Member = require("../models/Member.js");

exports.create = (memberData) => Member.create(memberData);

exports.getAll = () => Member.find();
