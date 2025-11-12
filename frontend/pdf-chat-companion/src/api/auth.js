import axiosInstance from "./axiosInstance";

// ✅ Login API
export const loginUser = async (credentials) => {
  return await axiosInstance.post("/auth/login", credentials);
};

// ✅ Signup API (optional)
export const registerUser = async (userData) => {
  return await axiosInstance.post("/auth/register", userData);
};
