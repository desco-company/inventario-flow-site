import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CreditCard, BarChart3, Users, Shield, Zap } from "lucide-react";

const FeaturedProducts = () => {
  const products = [
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Inventory Management",
      description: "Real-time stock tracking with low inventory alerts and automated reordering",
      features: ["Live stock updates", "Barcode scanning", "Multi-location support"],
      popular: false,
      price: "€29/month"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Payment Processing",
      description: "Accept all payment methods with secure, fast transaction processing",
      features: ["Card payments", "Digital wallets", "Split payments"],
      popular: true,
      price: "€39/month"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Reports",
      description: "Comprehensive business insights with customizable dashboards and reports",
      features: ["Sales analytics", "Custom reports", "Export data"],
      popular: false,
      price: "€19/month"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Management",
      description: "Build customer relationships with detailed profiles and purchase history",
      features: ["Customer profiles", "Purchase history", "Loyalty programs"],
      popular: false,
      price: "€25/month"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security & Compliance",
      description: "Enterprise-grade security with PCI compliance and data protection",
      features: ["PCI compliance", "Data encryption", "Access controls"],
      popular: false,
      price: "€15/month"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Quick Setup",
      description: "Get started in minutes with our guided setup and migration tools",
      features: ["5-min setup", "Data migration", "24/7 support"],
      popular: false,
      price: "Free"
    }
  ];

  return (
    <section id="products" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Powerful Features
            </span>
            <br />
            <span className="text-foreground">for Every Business Need</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From small retailers to enterprise chains, our modular POS system grows with your business. 
            Choose the features you need and scale as you grow.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={`relative transition-all duration-300 hover:shadow-glow hover:scale-105 ${
                product.popular ? 'border-primary shadow-glow' : ''
              }`}
            >
              {product.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${
                  product.popular ? 'bg-gradient-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  {product.icon}
                </div>
                <CardTitle className="text-xl">{product.title}</CardTitle>
                <CardDescription className="text-sm">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <ul className="space-y-2">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-foreground">{product.price}</span>
                      {product.price !== "Free" && (
                        <span className="text-sm text-muted-foreground">/month</span>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant={product.popular ? "gradient" : "outline"} 
                    className="w-full"
                  >
                    {product.price === "Free" ? "Get Started" : "Start Trial"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6">
              Our enterprise team can create a tailored POS solution that fits your unique business requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg">
                Contact Sales
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;