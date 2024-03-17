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
  }
};

exports.getExpiringMembers = async () => {
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00

  // Get the date that is 2 days from now
  const twoDaysFromNow = new Date();
  twoDaysFromNow.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

  // Query to find documents where the endDate is within the next 2 days or less
  const expiringMembers = await Member.find({
    endDate: {
      $lte: twoDaysFromNow, // End date is less than or equal to twoDaysFromNow
      $gte: currentDate, // End date is greater than or equal to currentDate
    },
  });
  return expiringMembers;
};

exports.getExpiredMembers = async () => {
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00

  // Query to find documents where the endDate is less than the current date or workouts are less than 1
  const expiredMembers = await Member.find({
    $or: [
      { workouts: { $lt: 1 } }, // Number of workouts is less than 1
      { endDate: { $lt: currentDate } }, // End date is less than current date
    ],
  });
  return expiredMembers;
};

exports.getMembersSortedByWorkouts = async () => {
  // Fetch all members
  const allMembers = await Member.find({
    workouts: { $exists: true, $ne: null },
  });

  // Sort allMembers by workouts in ascending order
  allMembers.sort((a, b) => a.workouts - b.workouts);

  return allMembers;
};
