import React, { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/Dialog.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/salesService.js";
import { getAllProducts } from "../services/productService.js";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    product_id: "",
    quantity: "",
    total_price: "",
    payment_method: "cash",
    status: "completed",
  });

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, []);

  // Create a lookup object for product names
  const productLookup = products.reduce((acc, product) => {
    acc[product.id] = product.name;
    return acc;
  }, {});

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (err) {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTransaction) {
        await updateTransaction(selectedTransaction.id, formData);
      } else {
        await createTransaction(formData);
      }
      fetchTransactions();
      handleCloseModal();
    } catch (err) {
      setError("Failed to save transaction");
    }
  };

  const handleDelete = async (transactionId) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      await deleteTransaction(transactionId);
      fetchTransactions();
    } catch (err) {
      setError("Failed to delete transaction");
    }
  };

  const handleOpenModal = (transaction = null) => {
    setSelectedTransaction(transaction);
    setFormData(
      transaction || {
        product_id: "",
        quantity: "",
        total_price: "",
        payment_method: "cash",
        status: "completed",
      },
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
    setError("");
  };

  const filteredTransactions = transactions.filter((t) =>
    t.product_id.toString().toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales Management</h1>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600">
          <Plus className="mr-2 h-4 w-4" /> New Sale
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="flex items-center space-x-4 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Quantity(kgs)</th>
                    <th className="px-4 py-3 text-left">Total Price</th>
                    <th className="px-4 py-3 text-left">Payment Method</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="px-4 py-3">
                        {productLookup[transaction.product_id] ||
                          "Unknown Product"}
                      </td>
                      <td className="px-4 py-3">{transaction.quantity}</td>
                      <td className="px-4 py-3">
                        ksh. {transaction.total_price}
                      </td>
                      <td className="px-4 py-3">
                        {transaction.payment_method}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenModal(transaction)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDelete(transaction.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {selectedTransaction ? "Edit Sale" : "New Sale"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Dropdown */}
              <label className="block text-sm font-medium">Product</label>
              <select
                value={formData.product_id}
                onChange={(e) =>
                  setFormData({ ...formData, product_id: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>

              {/* Quantity */}
              <label className="block text-sm font-medium">Quantity</label>
              <Input
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />

              {/* Total Price */}
              <label className="block text-sm font-medium">Total Price</label>
              <Input
                type="number"
                placeholder="Enter total price"
                value={formData.total_price}
                onChange={(e) =>
                  setFormData({ ...formData, total_price: e.target.value })
                }
              />

              {/* Payment Method Dropdown */}
              <label className="block text-sm font-medium">
                Payment Method
              </label>
              <select
                value={formData.payment_method}
                onChange={(e) =>
                  setFormData({ ...formData, payment_method: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="cash">Cash</option>
                <option value="mpesa">M-Pesa</option>
              </select>

              {/* Status Dropdown */}
              <label className="block text-sm font-medium">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600">
                  {selectedTransaction ? "Update" : "Create"} Sale
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TransactionsPage;
