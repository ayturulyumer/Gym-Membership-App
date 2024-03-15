const baseUrl = import.meta.env.VITE_APP_BASEURL;
import * as request from "../lib/request.js";

export const addMember = async (data) => {
  const result = await request.post(`${baseUrl}/members`, data);
  return result;
};

export const getAllMembers = async () => {
  const result = await request.get(`${baseUrl}/members`);
  return result;
};

export const renewMembership = async (memberId, data) => {
  const result = await request.put(`${baseUrl}/members/${memberId}`, data);
  return result;
};

export const deleteMember = async (memberId) => {
  const result = await request.del(`${baseUrl}/members/${memberId}`);
};

export const decreaseMemberWorkout = async (memberId) => {
  const result = await request.patch(`${baseUrl}/members/${memberId}`);
  return result;
};

export const searchMembers = async (query) => {
  const result = await request.get(`${baseUrl}/members/search/?name=${query}`);
  return result;
};

export const getExpiringMembers = async () => {
  const result = await request.get(`${baseUrl}/members/expiring`);
  return result;
};

export const getExpiredMembers = async () => {
  const result = await request.get(`${baseUrl}/members/expired`);
  return result;
};

export const getSortedMembers = async (sortValue) => {
  let result;
  if (sortValue === "expiringMemberships") {
    result = await request.get(`${baseUrl}/members/expiring`);
  } else if (sortValue === "expiredMemberships") {
    result = await request.get(`${baseUrl}/members/expired`);
  } else if (sortValue === "remainingWorkouts") {
    result = await request.get(`${baseUrl}/members/remainingWorkouts`);
  } else {
    result = await request.get(`${baseUrl}/members`);
  }
  return result;
};
