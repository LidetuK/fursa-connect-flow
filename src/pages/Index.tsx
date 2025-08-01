import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Target,
  Menu,
  ChevronDown,
  DollarSign,
  UserCheck,
  MessageCircle,
  PieChart,
  LineChart,
  BarChart2
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [openBenefit, setOpenBenefit] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const benefits = {
    qualification: {
      title: "24/7 Lead Qualification",
      description: "Automatically qualify leads while you sleep, filtering serious buyers from casual inquiries.",
      features: [
        "Instant response to inquiries",
        "Smart qualifying questions",
        "Lead scoring and prioritization",
        "Integration with your CRM"
      ]
    },
    conversion: {
      title: "Higher Conversion Rates",
      description: "Turn more visitors into customers with intelligent conversations and follow-ups.",
      features: [
        "Personalized responses",
        "Automated follow-up sequences",
        "A/B tested conversation flows",
        "Real-time optimization"
      ]
    },
    automation: {
      title: "Process Automation",
      description: "Automate repetitive tasks and focus your team on high-value activities.",
      features: [
        "Workflow automation",
        "Task scheduling",
        "Team notifications",
        "Performance tracking"
      ]
    },
    insights: {
      title: "Data-Driven Insights",
      description: "Get actionable insights about your leads and customer behavior patterns.",
      features: [
        "Lead analytics dashboard",
        "Conversation insights",
        "Performance metrics",
        "Predictive analytics"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Orange Notification Bar */}
      <div className="bg-accent text-accent-foreground py-3 px-6 text-center relative">
        <div className="container mx-auto flex items-center justify-center">
          <span className="text-sm font-medium">FursaAI raises $35M Series A led by Accel. Discover what's next.</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>

      {/* Navigation Header */}
      <header className="bg-background border-b border-border/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">FursaAI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Dialog open={openBenefit === 'qualification'} onOpenChange={(open) => setOpenBenefit(open ? 'qualification' : null)}>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-1 text-foreground hover:text-primary cursor-pointer">
                  <span>Lead Qualification</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{benefits.qualification.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{benefits.qualification.description}</p>
                  <div className="space-y-2">
                    {benefits.qualification.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={openBenefit === 'conversion'} onOpenChange={(open) => setOpenBenefit(open ? 'conversion' : null)}>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-1 text-foreground hover:text-primary cursor-pointer">
                  <span>Higher Conversions</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{benefits.conversion.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{benefits.conversion.description}</p>
                  <div className="space-y-2">
                    {benefits.conversion.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={openBenefit === 'automation'} onOpenChange={(open) => setOpenBenefit(open ? 'automation' : null)}>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-1 text-foreground hover:text-primary cursor-pointer">
                  <span>Process Automation</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{benefits.automation.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{benefits.automation.description}</p>
                  <div className="space-y-2">
                    {benefits.automation.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={openBenefit === 'insights'} onOpenChange={(open) => setOpenBenefit(open ? 'insights' : null)}>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-1 text-foreground hover:text-primary cursor-pointer">
                  <span>Data Insights</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{benefits.insights.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{benefits.insights.description}</p>
                  <div className="space-y-2">
                    {benefits.insights.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-background overflow-hidden">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 pt-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>It for Scale</span>
            <span>•</span>
            <span>Centralized Finance</span>
            <span>•</span>
            <span>Multi-Entity</span>
          </div>
        </div>

        <div className="container mx-auto px-6 pt-16 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 scroll-reveal">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight animate-fade-up">
                  <span className="text-foreground">Qualify Leads</span>
                  <br />
                  <span className="text-foreground">While You </span>
                  <span className="text-primary">Sleep.</span>
                </h1>
                
                <p className="text-xl text-foreground leading-relaxed animate-fade-up" style={{animationDelay: '0.2s'}}>
                  <span className="text-primary font-semibold">FursaAI</span> helps you qualify leads automatically so your team can focus on closing, not chasing. 
                  Respond instantly, filter serious buyers, and keep conversations warm 24/7.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{animationDelay: '0.4s'}}>
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg group"
                    onClick={() => navigate('/signin')}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-2 hover:bg-primary/10">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>
              </div>

              <div className="space-y-4 animate-fade-up" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>24/7 instant responses</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Multi-channel support</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Smart lead qualification</span>
                </div>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative">
              <div className="relative bg-card rounded-3xl shadow-2xl overflow-hidden">
                {/* Revenue Card */}
                <div className="absolute top-8 right-8 bg-card rounded-2xl p-6 shadow-lg border border-border/20 w-64">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-muted rounded-full"></div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Revenue</div>
                      <div className="text-2xl font-bold text-foreground">$956K</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">VP of Finance</span>
                      <span className="text-primary">+ 20%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 bg-primary rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* Cash Flow Chart */}
                <div className="absolute bottom-8 left-8 bg-card rounded-2xl p-6 shadow-lg border border-border/20 w-80">
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground">Cash Flow</div>
                    <div className="text-primary font-semibold">+ 9.8%</div>
                  </div>
                  <div className="grid grid-cols-6 gap-2 h-16 items-end">
                    {[60, 80, 40, 90, 70, 85].map((height, i) => (
                      <div key={i} className="bg-primary rounded-t" style={{height: `${height}%`}}></div>
                    ))}
                  </div>
                </div>

                {/* Main Dashboard */}
                <div className="p-8 bg-gradient-to-br from-background to-card min-h-96">
                  <div className="space-y-6">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="space-y-3">
                      <div className="h-3 bg-muted/60 rounded w-2/3"></div>
                      <div className="h-3 bg-muted/60 rounded w-1/2"></div>
                      <div className="h-3 bg-muted/60 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Channel Section */}
      <section className="py-32 bg-card scroll-reveal">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Available Where Your Customers Are
            </h2>
            <p className="text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
              No matter where your leads come from, Fursa AI is ready to engage and qualify them instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background/50 border border-border/20 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Website Chat</h3>
                  <p className="text-muted-foreground">Chat directly on your website with visitors in real-time</p>
                </div>
              </div>
            </Card>

            <Card className="bg-background/50 border border-border/20 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Social Media</h3>
                  <p className="text-muted-foreground">Connect with users on WhatsApp, Facebook, and Instagram</p>
                </div>
              </div>
            </Card>

            <Card className="bg-background/50 border border-border/20 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Voice Calls</h3>
                  <p className="text-muted-foreground">Answer voice calls with smart, natural conversations</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Understanding Section */}
      <section className="py-32 bg-background scroll-reveal">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                
                <h2 className="text-5xl font-bold text-foreground">
                  AI That Understands People
                </h2>
                
                <p className="text-xl text-foreground leading-relaxed">
                  Fursa AI doesn't just reply — it understands. It detects what your customers really need, 
                  asks qualifying questions naturally, and routes hot leads to your sales team instantly.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">Detects customer intent and needs</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">Asks natural qualifying questions</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">Routes hot leads instantly</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-card/50 border border-border/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Lead Qualification</div>
                      <div className="text-sm text-muted-foreground">Active conversation</div>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">High Intent</Badge>
                </div>
              </Card>

              <Card className="bg-card/50 border border-border/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Target className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Smart Routing</div>
                      <div className="text-sm text-muted-foreground">To sales team</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">Routed</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Content Learning Section */}
      <section className="py-32 bg-card scroll-reveal">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-lg font-semibold text-foreground">Training Content</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">FAQs.pdf</span>
                      <Badge className="bg-green-100 text-green-700 text-xs">Learned</Badge>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Product Brochure.pdf</span>
                      <Badge className="bg-green-100 text-green-700 text-xs">Learned</Badge>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary/50 rounded-full"></div>
                      <span className="text-muted-foreground">Pricing Guide.pdf</span>
                      <Badge className="bg-blue-100 text-blue-700 text-xs">Learning</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-5xl font-bold text-foreground">
                  Smarter with Your Content
                </h2>
                
                <p className="text-xl text-foreground leading-relaxed">
                  Fursa AI learns from the information you already have. Use your FAQs, brochures, 
                  or guides to train the AI. Answers are always accurate, up-to-date, and consistent.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">Train with your existing content</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">Always accurate and consistent</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">No need to repeat yourself</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-32 bg-background scroll-reveal">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold text-foreground">
                Insights That Help You Grow
              </h2>
              
              <p className="text-xl text-foreground leading-relaxed">
                Know what your customers care about and what works. See trends in questions, 
                understand what's driving conversions, and use real data to improve your service.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground">See trends in customer questions</span>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart3 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground">Understand conversion drivers</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground">Use data to improve service</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Lead Quality Score */}
                <Card className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Lead Quality</div>
                    <div className="text-3xl font-bold text-foreground">87%</div>
                    <div className="text-sm text-primary">+ 12%</div>
                    <div className="h-8 flex items-end">
                      <div className="bg-primary rounded w-full h-2"></div>
                    </div>
                  </div>
                </Card>

                {/* Response Time */}
                <Card className="bg-card border border-border/20 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Avg Response</div>
                    <div className="text-3xl font-bold text-foreground">2.3s</div>
                    <div className="text-sm text-primary">-45%</div>
                    <div className="h-8 flex items-center">
                      <div className="bg-primary rounded w-1/4 h-1"></div>
                    </div>
                  </div>
                </Card>

                {/* Conversion Rate */}
                <Card className="bg-card border border-border/20 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Conversion</div>
                    <div className="text-3xl font-bold text-foreground">23.4%</div>
                    <div className="text-sm text-primary">+ 18%</div>
                    <div className="h-12 flex items-end space-x-1">
                      {[30, 45, 60, 80, 55, 75].map((height, i) => (
                        <div key={i} className="bg-primary/60 rounded-t flex-1" style={{height: `${height}%`}}></div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Customer Satisfaction */}
                <Card className="bg-card border border-border/20 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                    <div className="text-3xl font-bold text-foreground">4.8</div>
                    <div className="flex items-center space-x-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-32 bg-card scroll-reveal">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              What You Get with Fursa AI
            </h2>
            <p className="text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
              Everything you need to transform your lead qualification process and grow your business faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-background/50 border border-border/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Automated Lead Qualification</h3>
                  <p className="text-muted-foreground text-sm">Let AI handle the initial screening so your team focuses on hot prospects</p>
                </div>
              </div>
            </Card>

            <Card className="bg-background/50 border border-border/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Instant Replies</h3>
                  <p className="text-muted-foreground text-sm">Respond to customer inquiries 24/7 across all channels</p>
                </div>
              </div>
            </Card>

            <Card className="bg-background/50 border border-border/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Smarter Follow-ups</h3>
                  <p className="text-muted-foreground text-sm">Never miss an opportunity with intelligent conversation tracking</p>
                </div>
              </div>
            </Card>

            <Card className="bg-background/50 border border-border/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Better Experience</h3>
                  <p className="text-muted-foreground text-sm">Delight customers and empower your team with AI assistance</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-background scroll-reveal">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <h2 className="text-6xl font-bold text-foreground">
                Ready to <span className="text-primary">Qualify Leads</span> While You Sleep?
              </h2>
              
              <p className="text-xl text-foreground leading-relaxed">
                Join thousands of businesses using Fursa AI to automate their lead qualification 
                and focus on what matters most - closing deals.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-12 py-6 text-lg group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="rounded-full px-12 py-6 text-lg border-2 hover:bg-primary/10">
                  Schedule Demo
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-8 text-muted-foreground text-sm">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Setup in 5 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border/20 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Transform Your Business with AI-Powered Lead Qualification
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of businesses already using FursaAI to automate lead qualification, 
              increase conversion rates, and scale their operations efficiently.
            </p>
          </div>

          {/* Benefits Chart Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Leads Qualified */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <UserCheck className="h-8 w-8 text-primary" />
                  <Badge className="bg-primary/20 text-primary">+156%</Badge>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">12,847</div>
                  <div className="text-sm text-muted-foreground">Leads Qualified</div>
                </div>
                <div className="grid grid-cols-12 gap-1 h-6 items-end">
                  {[40, 60, 30, 80, 50, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                    <div key={i} className="bg-primary/60 rounded-t" style={{height: `${height}%`}}></div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Revenue Growth */}
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <Badge className="bg-green-100 text-green-700">+89%</Badge>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Revenue Generated</div>
                </div>
                <div className="flex items-end space-x-1 h-6">
                  {[50, 65, 45, 75, 60, 85].map((height, i) => (
                    <div key={i} className="bg-green-500/60 rounded-t flex-1" style={{height: `${height}%`}}></div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Response Time */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                  <Badge className="bg-blue-100 text-blue-700">-92%</Badge>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">1.8s</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
            </Card>

            {/* Conversion Rate */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <PieChart className="h-8 w-8 text-purple-600" />
                  <Badge className="bg-purple-100 text-purple-700">+127%</Badge>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">34.2%</div>
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                </div>
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent transform rotate-45"></div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">&copy; 2025 FursaAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;