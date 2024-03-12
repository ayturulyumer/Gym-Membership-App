const Member = require("../models/Member.js");

exports.create = (memberData) => Member.create(memberData);

exports.getAll = () => Member.find();

exports.update = (memberId, memberData) => {
  const updatedMember = Member.findByIdAndUpdate(memberId, memberData);
  return updatedMember;
};

exports.delete = (memberId) => Member.findByIdAndDelete(memberId);
