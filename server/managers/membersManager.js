const Member = require("../models/Member.js");

exports.create = (memberData) => Member.create(memberData);

exports.getAll = () => Member.find();

exports.update = (memberId, memberData) =>
  Member.findByIdAndUpdate(memberId, memberData, { new: true });

exports.delete = (memberId) => Member.findByIdAndDelete(memberId);

exports.decreaseWorkout = async (memberId) => {
  const member = await Member.findById(memberId);
  if (member.workouts != 0) {
    member.workouts -= 1;
  }
  await member.save();
  return member;
};

exports.search = (searchCriteria) => {
  if (searchCriteria) {
    return Member.find({ name: searchCriteria }).lean();
  }
};
