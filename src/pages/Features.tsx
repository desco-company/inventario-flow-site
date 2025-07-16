import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  CreditCard, 
  BarChart3, 
  Users, 
  Shield, 
  Zap,
  Package,
  TrendingUp,
  Bell,
  FileText,
  Settings,
  Globe
} from "lucide-react";

const Features = () => {
  const featureCategories = [
    {
      title: "Core POS Features",
      description: "Essential tools for daily operations",
      features: [
        {
          icon: <ShoppingCart className="h-6 w-6" />,
          title: "Inventory Management",
          description: "Real-time stock tracking with automated alerts and barcode scanning",
          benefits: ["Live inventory updates", "Low stock alerts", "Barcode scanning", "Multi-location support"]
        },
        {
          icon: <CreditCard className="h-6 w-6" />,
          title: "Payment Processing",
          description: "Accept all payment methods with secure transaction processing",
          benefits: ["Card payments", "Digital wallets", "Split payments", "Contactless payments"]
        },
        {
          icon: <Package className="h-6 w-6" />,
          title: "Product Categories",
          description: "Organize products with custom categories and variants",
          benefits: ["Custom categories", "Product variants", "Bulk operations", "Image management"]
        }
      ]
    },
    {
      title: "Business Intelligence",
      description: "Advanced analytics and reporting tools",
      features: [
        {
          icon: <BarChart3 className="h-6 w-6" />,
          title: "Sales Analytics",
          description: "Comprehensive insights into your business performance",
          benefits: ["Daily/Monthly reports", "Revenue tracking", "Top products", "Sales trends"]
        },
        {
          icon: <TrendingUp className="h-6 w-6" />,
          title: "Performance Metrics",
          description: "Track key performance indicators and growth metrics",
          benefits: ["KPI dashboard", "Growth analysis", "Profit margins", "Customer insights"]
        },
        {
          icon: <FileText className="h-6 w-6" />,
          title: "Exportable Reports",
          description: "Generate detailed reports in PDF and CSV formats",
          benefits: ["PDF/CSV export", "Custom date ranges", "Tax breakdowns", "Discount analysis"]
        }
      ]
    },
    {
      title: "Customer Management",
      description: "Build lasting customer relationships",
      features: [
        {
          icon: <Users className="h-6 w-6" />,
          title: "Customer Profiles",
          description: "Detailed customer information and purchase history",
          benefits: ["Customer database", "Purchase history", "Contact management", "Notes & tags"]
        },
        {
          icon: <Bell className="h-6 w-6" />,
          title: "Loyalty Programs",
          description: "Reward customers and increase retention",
          benefits: ["Points system", "Rewards tracking", "Special offers", "Birthday campaigns"]
        }
      ]
    },
    {
      title: "Administration",
      description: "Secure and scalable management tools",
      features: [
        {
          icon: <Shield className="h-6 w-6" />,
          title: "Role-Based Access",
          description: "Secure user management with custom permissions",
          benefits: ["Admin/Manager/Staff roles", "Permission controls", "Activity logs", "Secure authentication"]
        },
        {
          icon: <Settings className="h-6 w-6" />,
          title: "System Configuration",
          description: "Customize the system to fit your business needs",
          benefits: ["Tax settings", "Currency options", "Receipt templates", "Business branding"]
        },
        {
          icon: <Globe className="h-6 w-6" />,
          title: "Multi-Location",
          description: "Manage multiple stores from one central dashboard",
          benefits: ["Centralized management", "Location-specific data", "Transfer inventory", "Unified reporting"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4">Complete Feature Set</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Everything You Need
              </span>
              <br />
              <span className="text-foreground">to Run Your Business</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From basic POS functionality to advanced analytics, our comprehensive platform 
              provides all the tools you need to manage and grow your retail business.
            </p>
            <Button variant="gradient" size="xl">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featureCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                <p className="text-lg text-muted-foreground">{category.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.features.map((feature, featureIndex) => (
                  <Card key={featureIndex} className="transition-all duration-300 hover:shadow-glow hover:scale-105">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using our POS system to streamline operations and boost sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;