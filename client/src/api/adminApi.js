const baseUrl = import.meta.env.VITE_APP_BASEURL
import * as request from "../lib/request.js"

export const login = async (data) => {
    const result = request.post(`${baseUrl}/admin/login`, data);
    return result;
  };