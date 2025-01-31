import axiosInstance from "./axiosInstance";

export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("/products/", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/");
    return response.data;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

export const getProductsById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting product by id:", error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axiosInstance.put(
      `/products/${productId}`,
      productData,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};
