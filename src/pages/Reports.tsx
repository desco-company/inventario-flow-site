import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Filter
} from "lucide-react";
import { format } from "date-fns";

const Reports = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedReport, setSelectedReport] = useState("sales");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const reportTypes = [
    { value: "sales", label: "Sales Report", icon: <DollarSign className="h-4 w-4" /> },
    { value: "products", label: "Product Performance", icon: <Package className="h-4 w-4" /> },
    { value: "customers", label: "Customer Analytics", icon: <Users className="h-4 w-4" /> },
    { value: "tax", label: "Tax & Discount Report", icon: <FileText className="h-4 w-4" /> },
    { value: "inventory", label: "Inventory Report", icon: <ShoppingCart className="h-4 w-4" /> }
  ];

  const salesData = {
    totalRevenue: 76543.20,
    totalTransactions: 1205,
    avgOrderValue: 63.50,
    growthRate: 15.3,
    topProducts: [
      { name: "Coffee Beans Premium", revenue: 8420, quantity: 342, percentage: 11.0 },
      { name: "Wireless Headphones", revenue: 7890, quantity: 89, percentage: 10.3 },
      { name: "Organic Tea Set", revenue: 6540, quantity: 327, percentage: 8.5 },
      { name: "Laptop Stand", revenue: 5210, quantity: 130, percentage: 6.8 },
      { name: "Bluetooth Speaker", revenue: 4320, quantity: 108, percentage: 5.6 }
    ],
    dailySales: [
      { date: "Jan 1", sales: 2340 },
      { date: "Jan 2", sales: 2890 },
      { date: "Jan 3", sales: 2100 },
      { date: "Jan 4", sales: 3200 },
      { date: "Jan 5", sales: 2760 },
      { date: "Jan 6", sales: 3450 },
      { date: "Jan 7", sales: 2980 }
    ]
  };

  const taxData = {
    totalTax: 9876.43,
    totalDiscounts: 3421.87,
    netRevenue: 63244.90,
    taxBreakdown: [
      { category: "VAT (20%)", amount: 7234.56, percentage: 73.2 },
      { category: "Service Tax (5%)", amount: 1876.23, percentage: 19.0 },
      { category: "Local Tax (2%)", amount: 765.64, percentage: 7.8 }
    ],
    discountBreakdown: [
      { type: "Loyalty Discount", amount: 1543.21, percentage: 45.1 },
      { type: "Bulk Discount", amount: 987.65, percentage: 28.9 },
      { type: "Seasonal Discount", amount: 891.01, percentage: 26.0 }
    ]
  };

  const handleExportPDF = () => {
    // Simulated PDF export
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${selectedReport}-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    alert(`Exporting ${selectedReport} report as PDF...`);
  };

  const handleExportCSV = () => {
    // Simulated CSV export
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${selectedReport}-report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    alert(`Exporting ${selectedReport} report as CSV...`);
  };

  const SalesReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">€{salesData.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-success">+{salesData.growthRate}%</span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold">{salesData.totalTransactions}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">€{salesData.avgOrderValue}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
                <p className="text-2xl font-bold text-success">+{salesData.growthRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Revenue contribution by product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{product.name}</h4>
                    <span className="text-sm font-medium">€{product.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{product.quantity} units sold</p>
                    <span className="text-sm text-muted-foreground">{product.percentage}% of total</span>
                  </div>
                  <Progress value={product.percentage} className="mt-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TaxReport = () => (
    <div className="space-y-6">
      {/* Tax Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Tax Collected</p>
              <p className="text-2xl font-bold text-primary">€{taxData.totalTax.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Discounts</p>
              <p className="text-2xl font-bold text-warning">€{taxData.totalDiscounts.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Net Revenue</p>
              <p className="text-2xl font-bold text-success">€{taxData.netRevenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tax Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Breakdown</CardTitle>
            <CardDescription>Tax collection by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taxData.taxBreakdown.map((tax, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{tax.category}</span>
                    <span className="text-sm font-medium">€{tax.amount.toLocaleString()}</span>
                  </div>
                  <Progress value={tax.percentage} />
                  <p className="text-xs text-muted-foreground text-right">{tax.percentage}% of total tax</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Discount Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Discount Analysis</CardTitle>
            <CardDescription>Discounts applied by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taxData.discountBreakdown.map((discount, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{discount.type}</span>
                    <span className="text-sm font-medium">€{discount.amount.toLocaleString()}</span>
                  </div>
                  <Progress value={discount.percentage} className="bg-warning/20" />
                  <p className="text-xs text-muted-foreground text-right">{discount.percentage}% of total discounts</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case "sales":
        return <SalesReport />;
      case "tax":
        return <TaxReport />;
      case "products":
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Product Performance Report</h3>
              <p className="text-muted-foreground">Detailed product analytics and performance metrics</p>
            </CardContent>
          </Card>
        );
      case "customers":
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Customer Analytics Report</h3>
              <p className="text-muted-foreground">Customer behavior and purchase patterns</p>
            </CardContent>
          </Card>
        );
      case "inventory":
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Inventory Report</h3>
              <p className="text-muted-foreground">Stock levels, movement, and reorder recommendations</p>
            </CardContent>
          </Card>
        );
      default:
        return <SalesReport />;
    }
  };

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
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Sales Reports</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="gradient" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Report Filters
            </CardTitle>
            <CardDescription>Customize your report parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Report Type */}
              <div>
                <label className="text-sm font-medium mb-2 block">Report Type</label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.icon}
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Period */}
              <div>
                <label className="text-sm font-medium mb-2 block">Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div>
                <label className="text-sm font-medium mb-2 block">From Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date To */}
              <div>
                <label className="text-sm font-medium mb-2 block">To Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {reportTypes.find(type => type.value === selectedReport)?.label}
            </h2>
            <p className="text-muted-foreground">
              Showing data for {selectedPeriod === "custom" ? "custom date range" : selectedPeriod}
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            Generated: {format(new Date(), "PPP")}
          </Badge>
        </div>

        {/* Report Content */}
        {renderReportContent()}
      </div>
    </div>
  );
};

export default Reports;