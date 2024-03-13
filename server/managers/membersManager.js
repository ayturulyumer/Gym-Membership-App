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
    // Create a regular expression pattern for partial matching and make it case-insensitive
    const regexPattern = new RegExp(searchCriteria, "i");

    // Use the regex pattern to find members whose names match partially with the searchCriteria
    return Member.find({ name: { $regex: regexPattern } }).lean();
  } else {
    throw Error;
  }
};
