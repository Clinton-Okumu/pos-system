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

// Logout function
export const logoutUser = async () => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token exists, the user is not authenticated, so we can return early or handle it
      throw new Error("No token found");
    }

    // Make the POST request to the /logout endpoint
    const response = await axiosInstance.post(
      "/auth/logout", // Adjust the URL based on your backend route
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      },
    );

    // Optionally, you can return the response or handle it here
    return response.data;
  } catch (error) {
    // Handle errors that occur during logout
    throw new Error(error.response?.data?.detail || "Logout failed");
  }
};
