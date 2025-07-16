import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: number;
  totalOrders: number;
  lastVisit: string;
  notes: string;
  loyaltyPoints: number;
  status: "active" | "inactive";
}

const Customers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1234567890",
      address: "123 Main St, City, State 12345",
      totalSpent: 1247.50,
      totalOrders: 15,
      lastVisit: "2024-01-15",
      notes: "Regular customer, prefers coffee products",
      loyaltyPoints: 120,
      status: "active"
    },
    {
      id: "2",
      name: "Sarah Smith",
      email: "sarah.smith@email.com",
      phone: "+1234567891",
      address: "456 Oak Ave, City, State 12345",
      totalSpent: 892.30,
      totalOrders: 12,
      lastVisit: "2024-01-10",
      notes: "Loves electronics, frequent buyer",
      loyaltyPoints: 89,
      status: "active"
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1234567892",
      address: "789 Pine St, City, State 12345",
      totalSpent: 2156.75,
      totalOrders: 28,
      lastVisit: "2024-01-12",
      notes: "VIP customer, bulk purchases",
      loyaltyPoints: 215,
      status: "active"
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+1234567893",
      address: "321 Elm St, City, State 12345",
      totalSpent: 543.20,
      totalOrders: 8,
      lastVisit: "2023-12-20",
      notes: "Occasional customer, price-sensitive",
      loyaltyPoints: 54,
      status: "inactive"
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = (formData: FormData) => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      notes: formData.get("notes") as string,
      totalSpent: 0,
      totalOrders: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      loyaltyPoints: 0,
      status: "active"
    };

    setCustomers([...customers, newCustomer]);
    setIsAddDialogOpen(false);
    toast({
      title: "Customer Added",
      description: `${newCustomer.name} has been added successfully.`,
    });
  };

  const handleEditCustomer = (formData: FormData) => {
    if (!editingCustomer) return;

    const updatedCustomer: Customer = {
      ...editingCustomer,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      notes: formData.get("notes") as string,
    };

    setCustomers(customers.map(c => c.id === editingCustomer.id ? updatedCustomer : c));
    setEditingCustomer(null);
    toast({
      title: "Customer Updated",
      description: `${updatedCustomer.name} has been updated successfully.`,
    });
  };

  const handleDeleteCustomer = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setCustomers(customers.filter(c => c.id !== customerId));
    toast({
      title: "Customer Deleted",
      description: `${customer?.name} has been deleted.`,
    });
  };

  const CustomerForm = ({ customer, onSubmit, isEdit = false }: { 
    customer?: Customer; 
    onSubmit: (formData: FormData) => void; 
    isEdit?: boolean;
  }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(new FormData(e.currentTarget)); }}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" defaultValue={customer?.name} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={customer?.email} required />
          </div>
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" defaultValue={customer?.phone} required />
        </div>
        
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" defaultValue={customer?.address} />
        </div>
        
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" placeholder="Customer preferences, notes..." defaultValue={customer?.notes} />
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="submit" variant="gradient">
          {isEdit ? "Update Customer" : "Add Customer"}
        </Button>
      </div>
    </form>
  );

  const CustomerDetails = ({ customer }: { customer: Customer }) => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Contact Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>{customer.address}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Customer Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-3">
                <div className="text-2xl font-bold">€{customer.totalSpent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total Spent</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-2xl font-bold">{customer.totalOrders}</div>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-2xl font-bold">{customer.loyaltyPoints}</div>
                <p className="text-xs text-muted-foreground">Loyalty Points</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-sm font-medium">{customer.lastVisit}</div>
                <p className="text-xs text-muted-foreground">Last Visit</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Notes */}
      {customer.notes && (
        <div>
          <h4 className="font-medium mb-2">Notes</h4>
          <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
            {customer.notes}
          </p>
        </div>
      )}

      {/* Recent Orders Placeholder */}
      <div>
        <h4 className="font-medium mb-2">Recent Orders</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Order #12345</p>
              <p className="text-sm text-muted-foreground">3 items • Jan 15, 2024</p>
            </div>
            <div className="text-right">
              <p className="font-medium">€89.99</p>
              <Badge variant="outline">Completed</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Order #12344</p>
              <p className="text-sm text-muted-foreground">2 items • Jan 10, 2024</p>
            </div>
            <div className="text-right">
              <p className="font-medium">€45.50</p>
              <Badge variant="outline">Completed</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
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
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Customer Management</h1>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Create a new customer profile
                </DialogDescription>
              </DialogHeader>
              <CustomerForm onSubmit={handleAddCustomer} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground">
                {customers.filter(c => c.status === "active").length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">From all customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                   customers.reduce((sum, c) => sum + c.totalOrders, 0)).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Per transaction</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.reduce((sum, c) => sum + c.loyaltyPoints, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total points issued</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {customer.email}
                    </CardDescription>
                  </div>
                  <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                    {customer.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Spent:</span>
                    <p className="font-medium">€{customer.totalSpent.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Orders:</span>
                    <p className="font-medium">{customer.totalOrders}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground text-sm">Loyalty Points:</span>
                    <p className="font-medium text-primary">{customer.loyaltyPoints}</p>
                  </div>
                  <div className="text-right text-sm">
                    <span className="text-muted-foreground">Last Visit:</span>
                    <p className="font-medium">{customer.lastVisit}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setViewingCustomer(customer)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{viewingCustomer?.name}</DialogTitle>
                        <DialogDescription>
                          Customer details and purchase history
                        </DialogDescription>
                      </DialogHeader>
                      {viewingCustomer && <CustomerDetails customer={viewingCustomer} />}
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setEditingCustomer(customer)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Customer</DialogTitle>
                        <DialogDescription>
                          Update customer information
                        </DialogDescription>
                      </DialogHeader>
                      <CustomerForm customer={editingCustomer || undefined} onSubmit={handleEditCustomer} isEdit />
                    </DialogContent>
                  </Dialog>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No customers found</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? "Try adjusting your search criteria" 
                : "Add your first customer to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;