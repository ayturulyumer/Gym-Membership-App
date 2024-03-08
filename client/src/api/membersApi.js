const baseUrl = import.meta.env.VITE_APP_BASEURL;
import * as request from "../lib/request.js";

export const addMember = async (data) => {
  const result = await request.post(`${baseUrl}/members`, data);
  return result;
};
