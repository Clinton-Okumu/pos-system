import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Search, Trash2 } from "lucide-react";

const ProductsPage = () => {
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
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.category
    ) {
      return;
    }
    const updatedProducts = [
      ...products,
      { ...newProduct, id: products.length + 1 },
    ];
    setProducts(updatedProducts);
    setNewProduct({ name: "", price: "", stock: "", category: "" });
    setShowAddForm(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId,
    );
    setProducts(updatedProducts);
  };

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
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" /> Add New Product
          </Button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <Card className="mb-8">
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
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Stock Quantity"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
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
              className="hover:shadow-lg transition-shadow"
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
                    Category: {product.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    In Stock: {product.stock} units
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
