import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ShoppingCart,
  AlertTriangle,
  Calendar,
  FileText,
  Settings,
  LogOut
} from "lucide-react";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const stats = {
    today: {
      revenue: 2847.50,
      transactions: 42,
      customers: 38,
      avgOrder: 67.80
    },
    week: {
      revenue: 18924.30,
      transactions: 287,
      customers: 234,
      avgOrder: 65.90
    },
    month: {
      revenue: 76543.20,
      transactions: 1205,
      customers: 892,
      avgOrder: 63.50
    }
  };

  const currentStats = stats[selectedPeriod as keyof typeof stats];

  const topProducts = [
    { name: "Coffee Beans Premium", sold: 24, revenue: 480 },
    { name: "Wireless Headphones", sold: 12, revenue: 840 },
    { name: "Organic Tea Set", sold: 18, revenue: 360 },
    { name: "Laptop Stand", sold: 8, revenue: 320 }
  ];

  const lowStockItems = [
    { name: "Coffee Beans Premium", stock: 5, threshold: 20 },
    { name: "Paper Cups", stock: 12, threshold: 50 },
    { name: "Cleaning Supplies", stock: 3, threshold: 15 }
  ];

  const recentTransactions = [
    { id: "TXN001", customer: "John Doe", amount: 45.99, items: 3, time: "2 min ago" },
    { id: "TXN002", customer: "Sarah Smith", amount: 128.50, items: 5, time: "15 min ago" },
    { id: "TXN003", customer: "Mike Johnson", amount: 89.99, items: 2, time: "32 min ago" },
    { id: "TXN004", customer: "Emma Wilson", amount: 234.75, items: 8, time: "1 hour ago" }
  ];

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-primary rounded-lg p-2">
              <ShoppingCart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MultiPOS Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline">Admin</Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Period Selector */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <div className="flex bg-secondary rounded-lg p-1">
            {[
              { key: "today", label: "Today" },
              { key: "week", label: "This Week" },
              { key: "month", label: "This Month" }
            ].map((period) => (
              <Button
                key={period.key}
                variant={selectedPeriod === period.key ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period.key)}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{currentStats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.transactions}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +8% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.customers}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +5% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{currentStats.avgOrder}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +3% from last period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest sales activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{transaction.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.items} items • {transaction.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{transaction.amount}</p>
                      <p className="text-sm text-muted-foreground">{transaction.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                Manage Products
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Customer List
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best sellers this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sold} sold</p>
                    </div>
                    <p className="text-sm font-medium">€{product.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Low Stock Alerts
              </CardTitle>
              <CardDescription>Items running low on inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-warning/20 bg-warning/5">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.stock} remaining (threshold: {item.threshold})
                      </p>
                    </div>
                    <div className="text-right">
                      <Progress 
                        value={(item.stock / item.threshold) * 100} 
                        className="w-20 mb-1"
                      />
                      <Badge variant="outline" className="text-xs border-warning text-warning">
                        Low Stock
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;