//*  Implementing the login and signup functionalities.
import axiosInstance from './axiosInstance';

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('auth/login', credentials);
    return response.data; // JWT token will be returned here
  } catch (error) {
    throw error.response.data;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post('auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
