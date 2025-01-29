import React, { useState } from "react";

const TransactionsPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState("");
  const [change, setChange] = useState(0);

  // Sample product list (this would typically come from the backend)
  const products = [
    { id: 1, name: "Cornflakes", price: 5, stock: 10 },
    { id: 2, name: "Rice Crispies", price: 6, stock: 15 },
    { id: 3, name: "Cheerios", price: 7, stock: 8 },
  ];

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update the total price
  const updateTotal = () => {
    let newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    if (discount > 0) {
      newTotal -= (newTotal * discount) / 100; // Apply discount
    }
    setTotal(newTotal);
  };

  // Calculate change for cash payment
  const handleCashPayment = () => {
    setChange(payment - total);
  };

  // Handle payment method
  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  // Handle discount change
  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  // Handle checkout completion
  const handleCheckout = () => {
    // Add logic to process the sale (e.g., save to database, update inventory, etc.)
    alert("Transaction completed!");
    setCart([]);
    setTotal(0);
    setDiscount(0);
    setPayment("");
    setChange(0);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">New Sale</h1>

      {/* Product Search and List */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for products"
          className="p-2 rounded-lg border border-gray-300 w-full"
        />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-600">
                {product.name}
              </h2>
              <p className="text-xl font-bold text-blue-600 mt-2">
                ${product.price}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Stock: {product.stock}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Cart Summary</h2>
        <div className="mt-4 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span>
                {item.quantity} x {item.name}
              </span>
              <span>${item.price * item.quantity}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">Total</span>
          <span className="text-xl font-bold text-blue-600">${total}</span>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Discount (%)
          </label>
          <input
            type="number"
            value={discount}
            onChange={handleDiscountChange}
            className="p-2 rounded-lg border border-gray-300 w-full"
          />
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Payment</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Payment Method
          </label>
          <select className="p-2 rounded-lg border border-gray-300 w-full">
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="mobile">Mobile Payment</option>
          </select>
        </div>

        {payment === "cash" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">
              Amount Paid
            </label>
            <input
              type="number"
              value={payment}
              onChange={handlePaymentChange}
              className="p-2 rounded-lg border border-gray-300 w-full"
            />
            <div className="mt-2">
              <p className="text-sm text-gray-600">Change: ${change}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleCheckout}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
        >
          Complete Sale
        </button>
      </div>
    </div>
  );
};

export default TransactionsPage;
