import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  getTransactionsByProduct,
  addTransaction,
} from "../services/productService.js"; // Replace with your actual API service
import "../styles/modalStyles.css"; // Adjust the path if needed

// Set the app element for accessibility (required for react-modal)
Modal.setAppElement("#root");

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    productId: "",
    quantity: "",
    totalPrice: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all transactions on page load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionData = await getTransactionsByProduct();
        setTransactions(transactionData);
      } catch (error) {
        console.error("Error fetching transactions", error);
        setError("Failed to load transactions. Please try again.");
      }
    };
    fetchTransactions();
  }, []);

  // Open Modal to add transaction
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNewTransaction({
      productId: "",
      quantity: "",
      totalPrice: "",
    });
  };

  // Handle adding a new transaction
  const handleAddTransaction = async () => {
    setError(""); // Clear previous errors
    if (
      !newTransaction.productId ||
      !newTransaction.quantity ||
      !newTransaction.totalPrice
    ) {
      setError("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const addedTransaction = await addTransaction(newTransaction);
      setTransactions([...transactions, addedTransaction]);
      closeModal(); // Close the modal after successful transaction addition
    } catch (error) {
      console.error("Error adding transaction", error);
      setError("Failed to add transaction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id),
      );
    } catch (error) {
      console.error("Error deleting transaction", error);
      setError("Failed to delete transaction.");
    }
  };

  // Handle updating a transaction (e.g., editing the transaction)
  const handleUpdateTransaction = async (transaction) => {
    setNewTransaction(transaction);
    openModal(); // Open modal with pre-filled values for editing
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Sales</h1>

      {/* Button to Add Sale */}
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-6"
      >
        Add New Sale
      </button>

      {/* Error Message */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Transactions List */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Sales List
        </h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500">No sales recorded.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Product ID
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Quantity
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Total Price
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-4 text-sm text-gray-700">
                    {transaction.productId}
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {transaction.quantity}
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {transaction.totalPrice}
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    <button
                      onClick={() => handleUpdateTransaction(transaction)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTransaction(transaction.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Adding or Editing Transaction */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add/Edit Sale"
        className="modal-content"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {newTransaction.productId ? "Edit Transaction" : "Add New Sale"}
        </h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Product ID</label>
            <input
              type="text"
              placeholder="Enter Product ID"
              value={newTransaction.productId}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  productId: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              placeholder="Enter Quantity"
              value={newTransaction.quantity}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  quantity: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Total Price</label>
            <input
              type="number"
              placeholder="Enter Total Price"
              value={newTransaction.totalPrice}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  totalPrice: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleAddTransaction}
            disabled={isSubmitting}
            className={`w-full py-3 text-white font-semibold rounded-md ${
              isSubmitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : newTransaction.productId
                ? "Update Transaction"
                : "Add Transaction"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TransactionsPage;
