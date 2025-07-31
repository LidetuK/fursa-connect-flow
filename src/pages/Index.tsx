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
  Target,
  Menu,
  ChevronDown
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
            <div className="flex items-center space-x-1 text-foreground hover:text-primary cursor-pointer">
              <span>Products</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center space-x-1 text-foreground hover:text-primary cursor-pointer">
              <span>Solutions</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <a href="#customers" className="text-foreground hover:text-primary">Customers</a>
            <div className="flex items-center space-x-1 text-foreground hover:text-primary cursor-pointer">
              <span>Resources</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Log in
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
              Get Started
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
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-foreground">Close Fast.</span>
                  <br />
                  <span className="text-foreground">Scale </span>
                  <span className="text-primary">Faster.</span>
                </h1>
                
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-xl text-foreground leading-relaxed">
                  <span className="text-primary font-semibold">FursaAI</span> is the AI-first ERP powering next-gen finance & accounting teams. General ledger, 
                  revenue automation, close management, and so much more—all on one unified platform.
                </p>
                
                <p className="text-muted-foreground">
                  Trusted by mid-market and enterprise leaders
                </p>
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

      {/* Product Demo Section */}
      <section className="py-32 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Circular Orange Background */}
            <div className="relative">
              <div className="w-96 h-96 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-radial rounded-full opacity-20"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full"></div>
                <div className="absolute inset-16 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full"></div>
                <div className="absolute inset-24 bg-background rounded-full flex items-center justify-center">
                  <div className="w-32 h-20 bg-muted rounded-lg"></div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex space-x-4 border-b border-border/20">
                <button className="pb-4 border-b-2 border-muted-foreground text-muted-foreground">
                  Core Accounting
                </button>
                <button className="pb-4 border-b-2 border-foreground text-foreground font-semibold">
                  Revenue Automation
                </button>
              </div>

              <div className="space-y-6">
                <h2 className="text-5xl font-bold text-foreground">
                  Revenue AI
                </h2>
                
                <p className="text-xl text-foreground leading-relaxed">
                  Automate your revenue accounting, reporting and invoicing with FursaAI. It 
                  seamlessly unifies revenue and customer data across sources, and supports a 
                  variety of business models from enterprise software to consumer fintech.
                </p>

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Ideal for: Teams that are manually performing revenue accounting and reporting in 
                    spreadsheets.
                  </p>
                  
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
                    See Revenue Automation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Automation Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-accent-foreground"></div>
                </div>
                
                <h2 className="text-5xl font-bold text-foreground">
                  Accelerate your close process
                </h2>
                
                <p className="text-xl text-foreground leading-relaxed">
                  Automate and streamline accounting tasks to shorten your close process, elevating accounting 
                  teams from data entry to data manager.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-card/50 border border-border/20 rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Stock Option Exercise</div>
                      <div className="text-sm text-muted-foreground">6/5/24</div>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>
                </div>
              </Card>

              <Card className="bg-card/50 border border-border/20 rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Close Accounting Period</div>
                      <div className="text-sm text-muted-foreground">6/5/24</div>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-32 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold text-foreground">
                See the forest, not the trees.
              </h2>
              
              <p className="text-xl text-foreground leading-relaxed">
                Unlock actionable and timely KPI's and financial insights with advanced financial reporting for 
                increased visibility. Empowering executives to make informed, timely decisions.
              </p>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Revenue Card */}
                <Card className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-foreground">$7M</div>
                    <div className="text-sm text-primary">+ 5%</div>
                    <div className="h-12 flex items-end space-x-1">
                      {[40, 60, 45, 80, 70, 90].map((height, i) => (
                        <div key={i} className="bg-primary/60 rounded-t flex-1" style={{height: `${height}%`}}></div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* ARR Card */}
                <Card className="bg-card border border-border/20 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">ARR</div>
                    <div className="text-3xl font-bold text-foreground">$36M</div>
                    <div className="text-sm text-primary">+ 10%</div>
                    <div className="h-8 flex items-end">
                      <div className="bg-primary rounded w-full h-2"></div>
                    </div>
                  </div>
                </Card>

                {/* Deferred Revenue */}
                <Card className="bg-card border border-border/20 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Deferred Revenue</div>
                    <div className="text-3xl font-bold text-foreground">$91K</div>
                    <div className="text-sm text-red-400">- 7%</div>
                    <div className="h-8 flex items-center">
                      <div className="bg-red-400 rounded w-2/3 h-1"></div>
                    </div>
                  </div>
                </Card>

                {/* Gross Churn */}
                <Card className="bg-card border border-border/20 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Gross Churn</div>
                    <div className="text-3xl font-bold text-foreground">$890</div>
                    <div className="text-sm text-red-400">- 7%</div>
                    <div className="h-8 flex items-center">
                      <div className="bg-red-400 rounded w-1/2 h-1"></div>
                    </div>
                  </div>
                </Card>

                {/* Customers */}
                <Card className="bg-card border border-border/20 rounded-2xl p-6 col-span-2">
                  <div className="text-sm text-muted-foreground mb-2">Customers</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          {/* Mid-Market Tab */}
          <div className="bg-card rounded-3xl p-16 mb-8 relative overflow-hidden">
            <div className="absolute top-8 left-8">
              <Badge className="bg-muted text-muted-foreground">Solutions</Badge>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-5xl font-bold text-foreground">
                    Built for your next stage of{" "}
                    <span className="text-primary">growth.</span>
                  </h2>
                  
                  <p className="text-xl text-foreground leading-relaxed">
                    The next-gen financial platform powering modern companies.
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold">
                    Mid-Market
                  </button>
                  <button className="text-muted-foreground px-6 py-2 rounded-full">
                    Enterprise
                  </button>
                  <button className="text-muted-foreground px-6 py-2 rounded-full">
                    Partners
                  </button>
                </div>
              </div>

              <Card className="bg-background/50 border border-border/20 rounded-3xl p-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">Mid-Market</h3>
                    <p className="text-muted-foreground">Scale with confidence</p>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({length: 25}).map((_, i) => (
                      <div key={i} className="w-4 h-4">
                        <ArrowRight className="w-full h-full text-muted-foreground/20" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <p className="text-foreground leading-relaxed">
                      The power of an ERP with none of the legacy baggage. FursaAI gives mid-market finance & accounting teams an 
                      intuitive platform for audit-readiness, multi-entity consolidations, close management, and financial reporting. 
                      Everything you need for your next phase of growth, on a platform you'll actually enjoy using.
                    </p>

                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
                      For Mid-Market
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border/20 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-accent" />
                <span className="text-xl font-bold text-foreground">FursaAI</span>
              </div>
              <p className="text-muted-foreground">
                The AI-first ERP powering next-gen finance & accounting teams.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground">Features</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">Pricing</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">Security</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground">About</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">Blog</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">Careers</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground">Help Center</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">Contact</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">Status</a>
              </div>
            </div>
          </div>

          <div className="border-t border-border/20 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 FursaAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;