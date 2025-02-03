import { axiosInstance } from "./axiosInstance.js";

export const createTransaction = async (transactionData) => {
  try {
    const response = await axiosInstance.post(
      "/transactions/",
      transactionData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export const getAllTransactions = async () => {
  try {
    const response = await axiosInstance.get("/transactions/");
    return response.data;
  } catch (error) {
    console.error("Error getting transactions:", error);
    throw error;
  }
};

export const getTransactionsByProduct = async (productId) => {
  try {
    const response = await axiosInstance.get(
      `/transactions/by-product/${productId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error getting transactions by product:", error);
    throw error;
  }
};

export const updateTransaction = async (transactionId, transactionData) => {
  try {
    const response = await axiosInstance.put(
      `/transactions/${transactionId}`,
      transactionData,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axiosInstance.delete(
      `/transactions/${transactionId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
