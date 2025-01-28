import axiosInstance from "./axiosInstance";

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    return response.data; // { access_token, token_type }
  } catch (error) {
    // Throw a meaningful error message
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};
