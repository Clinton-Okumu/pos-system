import React, { useState } from "react";

const ProductsPage = () => {
  // Sample data for products
  const initialProducts = [
    { id: 1, name: "Cornflakes", price: 5, stock: 20, category: "Cereal" },
    { id: 2, name: "Rice Crispies", price: 6, stock: 15, category: "Cereal" },
    { id: 3, name: "Cheerios", price: 7, stock: 8, category: "Cereal" },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [search, setSearch] = useState("");

  // Handle add product
  const handleAddProduct = () => {
    const updatedProducts = [
      ...products,
      { ...newProduct, id: products.length + 1 },
    ];
    setProducts(updatedProducts);
    setNewProduct({ name: "", price: "", stock: "", category: "" });
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Handle delete product
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId,
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Products</h1>

      {/* Search and Add Product */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search Products"
            value={search}
            onChange={handleSearchChange}
            className="p-2 rounded-lg border border-gray-300"
          />
          <button
            onClick={() =>
              setNewProduct({ name: "", price: "", stock: "", category: "" })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add New Product
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      {newProduct.name && (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Product
          </h2>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="p-2 mb-4 w-full border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="p-2 mb-4 w-full border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            className="p-2 mb-4 w-full border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="p-2 mb-4 w-full border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleAddProduct}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Add Product
          </button>
        </div>
      )}

      {/* Product List Table */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Product List
        </h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-2">{product.name}</td>
                <td className="p-2">${product.price}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
