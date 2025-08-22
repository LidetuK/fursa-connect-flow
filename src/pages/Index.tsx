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
import ChatBot from "@/components/ChatBot";
import ContactForm from "@/components/ContactForm";

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
      title: "Compliant Lead Engagement",
      description: "Engage leads ethically with proper opt-in flows and approved message templates following WhatsApp Business policies.",
      features: [
        "Opt-in verification system",
        "Approved message templates",
        "24-hour window compliance",
        "Respectful communication"
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
           <span className="text-sm font-medium">FursaAI : WhatsApp Business API compliance automation. Get compliant messaging in minutes.</span>
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
                  <span>Compliant Engagement</span>
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
              variant="default" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
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
             <span>WhatsApp Business API</span>
            <span>•</span>
             <span>Compliant Messaging</span>
            <span>•</span>
             <span>Opt-in Management</span>
          </div>
        </div>

        <div className="container mx-auto px-6 pt-16 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 scroll-reveal">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight animate-fade-up">
                  <span className="text-foreground">Engage Leads</span>
                  <br />
                  <span className="text-foreground">With </span>
                  <span className="text-primary">Compliance.</span>
                </h1>
                
                <p className="text-xl text-foreground leading-relaxed animate-fade-up" style={{animationDelay: '0.2s'}}>
                  <span className="text-primary font-semibold">FursaAI</span> helps you manage customer conversations ethically and efficiently. 
                  Build trust through proper opt-in flows, approved message templates, and respectful communication that follows WhatsApp Business policies.
                </p>
                
                <div className="flex justify-center lg:justify-start animate-fade-up" style={{animationDelay: '0.4s'}}>
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-6 text-lg group shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    onClick={() => navigate('/signin')}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4 animate-fade-up" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>WhatsApp Business API compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Proper opt-in management</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Approved message templates</span>
                </div>
              </div>
            </div>

            {/* Animated Chart Dashboard */}
            <div className="relative">
              <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-2xl animate-fade-up" style={{animationDelay: '0.6s'}}>
                <div className="mb-6">
                   <h3 className="text-2xl font-bold text-foreground mb-2">Compliance Dashboard</h3>
                   <p className="text-muted-foreground">Opt-in rates and template performance</p>
                </div>
                
                <div className="space-y-6">
                  {[
                     { month: "Jan", value: 45, optins: 128, color: "bg-orange-500" },
                     { month: "Feb", value: 62, optins: 189, color: "bg-orange-600" },
                     { month: "Mar", value: 78, optins: 245, color: "bg-primary" },
                     { month: "Apr", value: 89, optins: 312, color: "bg-green-500" },
                     { month: "May", value: 95, optins: 387, color: "bg-green-600" }
                  ].map((item, index) => (
                    <div key={item.month} className="flex items-center gap-4 group hover:bg-primary/5 rounded-lg p-2 transition-all duration-300">
                      <span className="text-sm font-medium w-10 text-muted-foreground">{item.month}</span>
                      <div className="flex-1 bg-muted/30 rounded-full h-4 overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out animate-scale-in shadow-lg`}
                          style={{ 
                            width: `${item.value}%`,
                            animationDelay: `${index * 200}ms`
                          }}
                        />
                      </div>
                      <div className="text-right min-w-[80px]">
                        <div className="text-sm font-bold text-foreground">{item.value}%</div>
                         <div className="text-xs text-muted-foreground">{item.optins} opt-ins</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-primary/10 rounded-xl border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                       <span className="text-sm font-medium text-foreground">Compliance Score</span>
                    </div>
                    <div className="text-right">
                       <div className="text-lg font-bold text-primary">98.5%</div>
                       <div className="text-xs text-muted-foreground">Policy adherence</div>
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
               Meet Customers on Their Favorite Channels
             </h2>
             <p className="text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
               FursaAI helps you start conversations where they happen and move them to WhatsApp seamlessly and compliantly.
             </p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             <Card className="bg-background/50 border border-border/20 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
               <div className="space-y-6">
                 <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                   <Globe className="h-8 w-8 text-primary" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-foreground mb-2">Website Chat</h3>
                   <p className="text-muted-foreground">Qualify leads instantly on your website and secure opt-in for ongoing WhatsApp conversations.</p>
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
                   <p className="text-muted-foreground">Connect on Meta's platforms. Use Facebook & Instagram ads to drive compliant WhatsApp opt-ins.</p>
                 </div>
               </div>
             </Card>

             <Card className="bg-background/50 border border-border/20 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
               <div className="space-y-6">
                 <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                   <MessageCircle className="h-8 w-8 text-primary" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-foreground mb-2">WhatsApp</h3>
                   <p className="text-muted-foreground">Engage users who have explicitly chosen to hear from you with fast, personalized responses.</p>
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
                   <p className="text-muted-foreground">Handle customer calls with AI, then follow up via WhatsApp with permission.</p>
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
                   <div className="flex items-start space-x-3">
                     <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                     <span className="text-foreground">Maintains transparency by identifying itself as an AI assistant</span>
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

               <Card className="bg-card/50 border border-border/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-4">
                     <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                       <BarChart3 className="w-4 h-4 text-primary-foreground" />
                     </div>
                     <div>
                       <div className="font-semibold text-foreground">Intent Scoring</div>
                       <div className="text-sm text-muted-foreground">Conversation Analysis</div>
                     </div>
                   </div>
                   <Badge className="bg-blue-100 text-blue-700 border-blue-200">Analyzing</Badge>
                 </div>
               </Card>

               <Card className="bg-card/50 border border-border/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-4">
                     <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                       <ArrowRight className="w-4 h-4 text-primary-foreground" />
                     </div>
                     <div>
                       <div className="font-semibold text-foreground">Seamless Handoff</div>
                       <div className="text-sm text-muted-foreground">Pipeline Ready</div>
                     </div>
                   </div>
                   <Badge className="bg-purple-100 text-purple-700 border-purple-200">Ready</Badge>
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
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 hover:shadow-xl transition-all duration-500">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 animate-fade-in">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-lg font-semibold text-foreground">Training Content</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-all duration-300 animate-slide-in-right" style={{animationDelay: '0.1s'}}>
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-foreground font-medium flex-1">FAQs.pdf</span>
                      <Badge className="bg-green-100 text-green-700 text-xs border-green-200 animate-fade-in" style={{animationDelay: '0.3s'}}>Learned</Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-all duration-300 animate-slide-in-right" style={{animationDelay: '0.2s'}}>
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-foreground font-medium flex-1">Product Brochure.pdf</span>
                      <Badge className="bg-green-100 text-green-700 text-xs border-green-200 animate-fade-in" style={{animationDelay: '0.4s'}}>Learned</Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-all duration-300 animate-slide-in-right" style={{animationDelay: '0.3s'}}>
                      <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce"></div>
                      <span className="text-foreground font-medium flex-1">Pricing Guide.pdf</span>
                      <Badge className="bg-blue-100 text-blue-700 text-xs border-blue-200 animate-pulse" style={{animationDelay: '0.5s'}}>Learning</Badge>
                    </div>
                  </div>
                  
                  {/* Loading animation for the learning file */}
                  <div className="mt-4 p-3 rounded-lg bg-blue-50/50 border border-blue-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-blue-700 font-medium">Processing content...</span>
                    </div>
                    <div className="mt-2 w-full bg-blue-200 rounded-full h-1">
                      <div className="bg-blue-500 h-1 rounded-full animate-pulse" style={{width: '73%'}}></div>
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

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             <Card className="bg-background/50 border border-border/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
               <div className="space-y-4">
                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                   <Check className="h-6 w-6 text-primary" />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-foreground mb-2">Automated Lead Qualification</h3>
                   <p className="text-muted-foreground text-sm">Let AI handle the initial screening of incoming conversations so your team focuses on hot prospects</p>
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
                    <p className="text-muted-foreground text-sm">Respond to customer inquiries 24/7 on your website and social channels. On WhatsApp, we ensure swift, compliant responses using approved templates and within the platform's guidelines.</p>
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
                   <p className="text-muted-foreground text-sm">Never miss an opportunity with intelligent conversation tracking and template-based messaging.</p>
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
                 Qualify More Leads, <span className="text-primary">Close More Deals.</span>
               </h2>
               
               <p className="text-xl text-foreground leading-relaxed">
                 FursaAI handles initial qualifying conversations at scale, so your sales team can focus on what they do best: closing high-intent prospects.
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

      {/* Contact Form */}
      <ContactForm />

      {/* ChatBot */}
      <ChatBot />

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
             {/* Client Satisfaction */}
             <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6">
               <div className="space-y-4">
                 <div className="flex items-center justify-between">
                   <Star className="h-8 w-8 text-primary" />
                   <Badge className="bg-primary/20 text-primary">4.9/5.0</Badge>
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-foreground">Client Satisfaction</div>
                   <div className="text-sm text-muted-foreground">Rated by customers</div>
                 </div>
                 <div className="flex items-center space-x-1">
                   {[1,2,3,4,5].map((star) => (
                     <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                   ))}
                 </div>
               </div>
             </Card>

             {/* Leads Qualified */}
             <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-6">
               <div className="space-y-4">
                 <div className="flex items-center justify-between">
                   <UserCheck className="h-8 w-8 text-green-600" />
                   <Badge className="bg-green-100 text-green-700">High-Intent</Badge>
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-foreground">Leads Qualified</div>
                   <div className="text-sm text-muted-foreground">Quality over quantity</div>
                 </div>
                 <div className="flex items-end space-x-1 h-6">
                   {[60, 75, 85, 90, 95, 88].map((height, i) => (
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
                   <Badge className="bg-blue-100 text-blue-700">98%</Badge>
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-foreground">Avg Response Time</div>
                   <div className="text-sm text-muted-foreground">&lt; 5 seconds</div>
                 </div>
                 <div className="w-full bg-muted rounded-full h-2">
                   <div className="bg-blue-500 h-2 rounded-full w-[98%]"></div>
                 </div>
               </div>
             </Card>

             {/* Conversion Rate */}
             <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
               <div className="space-y-4">
                 <div className="flex items-center justify-between">
                   <PieChart className="h-8 w-8 text-purple-600" />
                   <Badge className="bg-purple-100 text-purple-700">31.5%</Badge>
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-foreground">Conversion Rate</div>
                   <div className="text-sm text-muted-foreground">Lead to customer</div>
                 </div>
                 <div className="relative w-16 h-16 mx-auto">
                   <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                   <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent transform rotate-[113.4deg]"></div>
                 </div>
               </div>
             </Card>
           </div>

                     <div className="text-center">
             <div className="flex items-center justify-center space-x-6 mb-4">
               <Button 
                 variant="link" 
                 className="text-muted-foreground hover:text-foreground p-0 h-auto"
                 onClick={() => navigate('/privacy-policy')}
               >
                 Privacy Policy
               </Button>
               <span className="text-muted-foreground">•</span>
                               <Button 
                  variant="link" 
                  className="text-muted-foreground hover:text-foreground p-0 h-auto"
                  onClick={() => navigate('/terms-of-service')}
                >
                  Terms of Service
                </Button>
             </div>
             <p className="text-muted-foreground">&copy; 2025 FursaAI. All rights reserved.</p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
