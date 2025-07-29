import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  MessageSquare, 
  Zap, 
  Users, 
  Smartphone, 
  BarChart3, 
  ArrowRight, 
  Check,
  Star,
  Globe,
  Shield,
  Workflow
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">FursaAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <Button variant="default" className="shadow-lg">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10"></div>
        <div className="container mx-auto px-6 py-24 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered WhatsApp Automation
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-[var(--gradient-hero)] bg-clip-text text-transparent">
              Transform Your WhatsApp Into An AI Powerhouse
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect your WhatsApp, automate conversations, and scale your business with intelligent AI workflows. 
              No coding required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 shadow-[var(--shadow-glow)]">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[var(--gradient-subtle)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose FursaAI?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to automate and scale your WhatsApp business communications
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Smart Conversations",
                description: "AI that understands context and responds naturally to customer inquiries 24/7"
              },
              {
                icon: Workflow,
                title: "Visual Automation",
                description: "Drag-and-drop workflow builder powered by n8n - no coding experience needed"
              },
              {
                icon: Smartphone,
                title: "WhatsApp Integration",
                description: "Seamless connection to WhatsApp Business API with one-click setup"
              },
              {
                icon: BarChart3,
                title: "Analytics & Insights",
                description: "Track performance, monitor conversations, and optimize your automation"
              },
              {
                icon: Users,
                title: "Multi-Agent Support",
                description: "Handle multiple conversations simultaneously with intelligent routing"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and compliance with international data protection standards"
              }
            ].map((feature, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-xl text-muted-foreground">
              Simple setup process that gets you running in no time
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Connect WhatsApp",
                description: "Link your WhatsApp Business account with our secure integration in just a few clicks"
              },
              {
                step: "02", 
                title: "Design Workflows",
                description: "Use our visual editor to create intelligent automation workflows without any coding"
              },
              {
                step: "03",
                title: "Go Live",
                description: "Activate your AI assistant and watch it handle conversations automatically"
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-[var(--shadow-glow)]">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-10 -right-4 h-6 w-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[var(--gradient-subtle)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Businesses Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              See what our customers are saying about FursaAI
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "E-commerce Manager",
                company: "TechStore",
                content: "FursaAI transformed our customer service. We're now handling 5x more inquiries with better response times.",
                rating: 5
              },
              {
                name: "Miguel Rodriguez",
                role: "Operations Director", 
                company: "FastDelivery",
                content: "The automation workflows are incredible. Our team can focus on complex issues while AI handles the routine questions.",
                rating: 5
              },
              {
                name: "Priya Patel",
                role: "Marketing Head",
                company: "GrowthLab",
                content: "Setting up was surprisingly easy. Within an hour, we had intelligent responses running for our WhatsApp campaigns.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of businesses already using FursaAI to automate their WhatsApp communications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8 py-6 shadow-[var(--shadow-glow)]">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-primary" />
              Free 14-day trial
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-primary" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-primary" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">FursaAI</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                AI-powered WhatsApp automation that scales your business communications intelligently.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 FursaAI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">English</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
