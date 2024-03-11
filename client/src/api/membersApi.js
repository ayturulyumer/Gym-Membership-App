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
