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
  Workflow,
  PlayCircle,
  TrendingUp,
  Clock,
  Target
} from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="h-8 w-8 text-primary animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
            </div>
            <span className="text-2xl font-bold bg-[var(--gradient-hero)] bg-clip-text text-transparent">
              FursaAI
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors duration-300">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors duration-300">How It Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors duration-300">Pricing</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact</a>
          </nav>
          <Button className="modern-button bg-primary hover:bg-primary/90 text-primary-foreground px-6">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="organic-shape organic-shape-1 animate-morph animate-float"></div>
          <div className="organic-shape organic-shape-2 animate-morph animate-float-reverse"></div>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent/30 rounded-full animate-bounce"></div>
        </div>

        <div className="container mx-auto px-6 pt-20 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <Badge variant="secondary" className="mb-8 text-sm px-6 py-3 bg-accent/10 text-accent border-accent/20 animate-fade-up">
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              AI-Powered WhatsApp Automation
            </Badge>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <span className="block">Transform Your</span>
              <span className="block bg-[var(--gradient-hero)] bg-clip-text text-transparent animate-gradient">
                WhatsApp Business
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.4s' }}>
              Connect your WhatsApp, automate conversations, and scale your business with intelligent AI workflows powered by n8n. 
              <span className="text-primary font-semibold">No coding required.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <Button 
                size="lg" 
                className="modern-button bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 rounded-2xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-10 py-6 rounded-2xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <PlayCircle className="mr-3 h-6 w-6" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                Free 14-day trial
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                Setup in 5 minutes
              </div>
            </div>
          </div>
        </div>

        {/* Floating Dashboard Mockup */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 animate-float">
          <div className="w-80 h-48 bg-[var(--gradient-card)] rounded-3xl shadow-[var(--shadow-elegant)] border border-border/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-xs text-muted-foreground">FursaAI Dashboard</div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-primary/20 rounded-full w-3/4"></div>
              <div className="h-3 bg-accent/20 rounded-full w-1/2"></div>
              <div className="h-3 bg-primary/30 rounded-full w-5/6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-[var(--gradient-subtle)] relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 scroll-reveal">
            <Badge variant="outline" className="mb-6 border-primary/20 text-primary">
              <Star className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-5xl font-bold mb-6">Why Choose FursaAI?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to automate and scale your WhatsApp business communications with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Smart Conversations",
                description: "AI that understands context and responds naturally to customer inquiries 24/7 with human-like intelligence",
                color: "text-primary",
                delay: "0s"
              },
              {
                icon: Workflow,
                title: "Visual Automation",
                description: "Drag-and-drop workflow builder powered by n8n - create complex automations without any coding experience",
                color: "text-accent",
                delay: "0.1s"
              },
              {
                icon: Smartphone,
                title: "WhatsApp Integration",
                description: "Seamless connection to WhatsApp Business API with one-click setup and instant synchronization",
                color: "text-primary",
                delay: "0.2s"
              },
              {
                icon: BarChart3,
                title: "Analytics & Insights",
                description: "Track performance, monitor conversations, and optimize your automation with real-time analytics",
                color: "text-accent",
                delay: "0.3s"
              },
              {
                icon: Users,
                title: "Multi-Agent Support",
                description: "Handle multiple conversations simultaneously with intelligent routing and load balancing",
                color: "text-primary",
                delay: "0.4s"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and compliance with international data protection standards and regulations",
                color: "text-accent",
                delay: "0.5s"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="scroll-reveal relative overflow-hidden group hover:shadow-[var(--shadow-elegant)] transition-all duration-500 hover:scale-105 bg-[var(--gradient-card)] border-border/50"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-full"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 scroll-reveal">
            <Badge variant="outline" className="mb-6 border-accent/20 text-accent">
              <Clock className="w-4 h-4 mr-2" />
              Quick Setup
            </Badge>
            <h2 className="text-5xl font-bold mb-6">Get Started in Minutes</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple setup process that gets you running in no time with our intuitive onboarding
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Connect WhatsApp",
                description: "Link your WhatsApp Business account with our secure integration in just a few clicks using our guided setup wizard",
                icon: Smartphone
              },
              {
                step: "02", 
                title: "Design Workflows",
                description: "Use our visual editor to create intelligent automation workflows without any coding using drag-and-drop interface",
                icon: Workflow
              },
              {
                step: "03",
                title: "Go Live",
                description: "Activate your AI assistant and watch it handle conversations automatically while you focus on growing your business",
                icon: TrendingUp
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative scroll-reveal" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-3xl bg-[var(--gradient-hero)] text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto shadow-[var(--shadow-glow)] animate-float">
                    {step.step}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{step.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden lg:block absolute top-12 -right-6 h-8 w-8 text-muted-foreground/30 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-[var(--gradient-subtle)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">Trusted by Growing Businesses</h2>
            <p className="text-xl text-muted-foreground">Join thousands of companies already using FursaAI</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Active Users", icon: Users },
              { number: "1M+", label: "Messages Processed", icon: MessageSquare },
              { number: "99.9%", label: "Uptime", icon: Shield },
              { number: "5min", label: "Average Setup", icon: Clock }
            ].map((stat, index) => (
              <div key={index} className="scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 scroll-reveal">
            <Badge variant="outline" className="mb-6 border-primary/20 text-primary">
              <Star className="w-4 h-4 mr-2" />
              Customer Stories
            </Badge>
            <h2 className="text-5xl font-bold mb-6">Loved by Businesses Worldwide</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what our customers are saying about their experience with FursaAI
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "E-commerce Manager",
                company: "TechStore",
                content: "FursaAI transformed our customer service completely. We're now handling 5x more inquiries with better response times and higher satisfaction.",
                rating: 5,
                avatar: "SJ"
              },
              {
                name: "Miguel Rodriguez",
                role: "Operations Director", 
                company: "FastDelivery",
                content: "The automation workflows are incredible. Our team can focus on complex issues while AI handles routine questions perfectly.",
                rating: 5,
                avatar: "MR"
              },
              {
                name: "Priya Patel",
                role: "Marketing Head",
                company: "GrowthLab",
                content: "Setting up was surprisingly easy. Within an hour, we had intelligent responses running for our WhatsApp campaigns with amazing results.",
                rating: 5,
                avatar: "PP"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="scroll-reveal relative bg-[var(--gradient-card)] border-border/50 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic leading-relaxed text-foreground">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--gradient-hero)] flex items-center justify-center text-primary-foreground font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-[var(--gradient-hero)]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-8 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of businesses already using FursaAI to automate their WhatsApp communications and scale their operations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button 
                size="lg" 
                className="modern-button bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
              >
                Start Your Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-10 py-6 rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-white/80">
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-white" />
                Free 14-day trial
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-white" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-white" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-accent opacity-90"></div>
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Bot className="h-8 w-8 text-accent" />
                <span className="text-2xl font-bold">FursaAI</span>
              </div>
              <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-md">
                AI-powered WhatsApp automation that scales your business communications intelligently and efficiently.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <Globe className="h-4 w-4 mr-2" />
                  English
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Product</h4>
              <ul className="space-y-3 text-white/80">
                <li><a href="#" className="hover:text-accent transition-colors duration-300">Features</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-300">Pricing</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-300">API</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-300">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-white/80">
                <li><a href="#" className="hover:text-accent transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-300">Status</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-300">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60">
              © 2024 FursaAI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Target className="h-5 w-5 text-accent" />
              <span className="text-white/60">Built for the future of business communication</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;