const Member = require("../models/Member.js");

exports.create = (memberData) => Member.create(memberData);

exports.getAll = () => Member.find();

exports.update = (memberId, memberData) => Member.findByIdAndUpdate(memberId, memberData, { new: true });



exports.delete = (memberId) => Member.findByIdAndDelete(memberId);
