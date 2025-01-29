import axiosInstance from "./axiosInstance"; // Import the configured axios instance

// Base URL for the API is already set in axiosInstance

// Fetch all transactions
export const getTransactions = async () => {
  try {
    const response = await axiosInstance.get("/api/transactions"); // Use axiosInstance here
    return response.data; // Return the transactions data
  } catch (error) {
    console.error("Error fetching transactions", error);
    throw error;
  }
};

// Add a new transaction
export const addTransaction = async (transactionData) => {
  try {
    const response = await axiosInstance.post(
      "/api/transactions",
      transactionData,
    ); // Use axiosInstance here
    return response.data; // Return the added transaction
  } catch (error) {
    console.error("Error adding transaction", error);
    throw error;
  }
};

// Get transactions by product ID
export const getTransactionsByProduct = async (productId) => {
  try {
    const response = await axiosInstance.get(
      `/api/transactions/by-product/${productId}`,
    ); // Use axiosInstance here
    return response.data; // Return the filtered transactions by product
  } catch (error) {
    console.error("Error fetching transactions by product", error);
    throw error;
  }
};
