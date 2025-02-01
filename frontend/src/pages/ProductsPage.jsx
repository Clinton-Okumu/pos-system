import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Search, Trash2 } from "lucide-react";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
} from "../services/productService"; // Import the API functions

const ProductsPage = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "", // Added to match backend schema
    price: "", // Changed to number
    quantity: "", // Changed from "stock" to "quantity"
    image_url: "", // Added to match backend schema
  });
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle adding a new product
  const handleAddProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.quantity // Changed from "stock" to "quantity"
    ) {
      return;
    }

    setLoading(true);
    try {
      await createProduct(newProduct);
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        image_url: "",
      });
      setShowAddForm(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    setLoading(true);
    try {
      await deleteProduct(productId);
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Products</h1>

        {/* Search and Add Product */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search Products"
              value={search}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" /> Add New Product
          </Button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <Card className="mb-8 bg-white">
            <CardHeader>
              <h2 className="text-xl font-semibold">Add New Product</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
              <Input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Image URL"
                value={newProduct.image_url}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image_url: e.target.value })
                }
              />
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </CardFooter>
          </Card>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-lg transition-shadow bg-white"
            >
              <CardContent className="pt-6">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-gray-400">Image Placeholder</div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Description: {product.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {product.quantity} units
                  </p>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
