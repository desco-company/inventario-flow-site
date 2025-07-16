import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter,
  ShoppingCart,
  BarChart3,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  category: string;
  stock: number;
  sku: string;
  status: "active" | "inactive";
  lowStockThreshold: number;
}

const Products = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Coffee Beans Premium",
      description: "High-quality coffee beans from Colombia",
      price: 24.99,
      cost: 15.00,
      category: "Beverages",
      stock: 5,
      sku: "CB001",
      status: "active",
      lowStockThreshold: 20
    },
    {
      id: "2",
      name: "Wireless Headphones",
      description: "Bluetooth 5.0 wireless headphones with noise cancellation",
      price: 89.99,
      cost: 45.00,
      category: "Electronics",
      stock: 25,
      sku: "WH002",
      status: "active",
      lowStockThreshold: 10
    },
    {
      id: "3",
      name: "Organic Tea Set",
      description: "Premium organic tea collection with 6 different flavors",
      price: 19.99,
      cost: 12.00,
      category: "Beverages",
      stock: 15,
      sku: "TS003",
      status: "active",
      lowStockThreshold: 5
    },
    {
      id: "4",
      name: "Laptop Stand",
      description: "Adjustable aluminum laptop stand for ergonomic working",
      price: 39.99,
      cost: 25.00,
      category: "Accessories",
      stock: 8,
      sku: "LS004",
      status: "inactive",
      lowStockThreshold: 5
    }
  ]);

  const categories = ["all", "Beverages", "Electronics", "Accessories", "Office", "Health"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (formData: FormData) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      cost: parseFloat(formData.get("cost") as string),
      category: formData.get("category") as string,
      stock: parseInt(formData.get("stock") as string),
      sku: formData.get("sku") as string,
      status: "active",
      lowStockThreshold: parseInt(formData.get("lowStockThreshold") as string)
    };

    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added successfully.`,
    });
  };

  const handleEditProduct = (formData: FormData) => {
    if (!editingProduct) return;

    const updatedProduct: Product = {
      ...editingProduct,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      cost: parseFloat(formData.get("cost") as string),
      category: formData.get("category") as string,
      stock: parseInt(formData.get("stock") as string),
      sku: formData.get("sku") as string,
      lowStockThreshold: parseInt(formData.get("lowStockThreshold") as string)
    };

    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    toast({
      title: "Product Updated",
      description: `${updatedProduct.name} has been updated successfully.`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Product Deleted",
      description: `${product?.name} has been deleted.`,
    });
  };

  const ProductForm = ({ product, onSubmit, isEdit = false }: { 
    product?: Product; 
    onSubmit: (formData: FormData) => void; 
    isEdit?: boolean;
  }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(new FormData(e.currentTarget)); }}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" defaultValue={product?.name} required />
          </div>
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" name="sku" defaultValue={product?.sku} required />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={product?.description} />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="price">Price (€)</Label>
            <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price} required />
          </div>
          <div>
            <Label htmlFor="cost">Cost (€)</Label>
            <Input id="cost" name="cost" type="number" step="0.01" defaultValue={product?.cost} required />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" name="stock" type="number" defaultValue={product?.stock} required />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={product?.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.filter(c => c !== "all").map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
            <Input id="lowStockThreshold" name="lowStockThreshold" type="number" defaultValue={product?.lowStockThreshold || 10} required />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="submit" variant="gradient">
          {isEdit ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              ← Back
            </Button>
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Product Management</h1>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Create a new product in your inventory
                </DialogDescription>
              </DialogHeader>
              <ProductForm onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                {products.filter(p => p.status === "active").length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Inventory value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {products.filter(p => p.stock <= p.lowStockThreshold).length}
              </div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(products.map(p => p.category)).size}
              </div>
              <p className="text-xs text-muted-foreground">Product categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      SKU: {product.sku}
                    </CardDescription>
                  </div>
                  <Badge variant={product.status === "active" ? "default" : "secondary"}>
                    {product.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <p className="font-medium">€{product.price}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cost:</span>
                    <p className="font-medium">€{product.cost}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground text-sm">Stock:</span>
                    <p className={`font-medium ${product.stock <= product.lowStockThreshold ? 'text-warning' : ''}`}>
                      {product.stock} units
                    </p>
                  </div>
                  <Badge variant="outline">{product.category}</Badge>
                </div>

                {product.stock <= product.lowStockThreshold && (
                  <div className="flex items-center gap-1 text-warning text-sm">
                    <AlertCircle className="h-4 w-4" />
                    Low Stock Alert
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingProduct(product)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                          Update product information
                        </DialogDescription>
                      </DialogHeader>
                      <ProductForm product={editingProduct || undefined} onSubmit={handleEditProduct} isEdit />
                    </DialogContent>
                  </Dialog>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Add your first product to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;