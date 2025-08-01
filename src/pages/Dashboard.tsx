import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  MessageSquare, 
  Users, 
  TrendingUp,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  DollarSign,
  UserCheck,
  MessageCircle,
  Target,
  Calendar,
  Filter,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Activity,
  Globe,
  Smartphone,
  Clock,
  Star,
  LogOut,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      title: "Leads Qualified",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: UserCheck,
      color: "text-primary"
    },
    {
      title: "Revenue Generated",
      value: "$184K",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Avg Response Time",
      value: "1.8s",
      change: "-15.3%",
      trend: "down",
      icon: MessageCircle,
      color: "text-blue-600"
    },
    {
      title: "Conversion Rate",
      value: "34.2%",
      change: "+6.8%",
      trend: "up",
      icon: Target,
      color: "text-purple-600"
    }
  ];

  const recentLeads = [
    { name: "Sarah Johnson", email: "sarah@example.com", score: 89, status: "Hot", time: "2 min ago", channel: "Website" },
    { name: "Mike Chen", email: "mike@example.com", score: 76, status: "Warm", time: "5 min ago", channel: "WhatsApp" },
    { name: "Emma Davis", email: "emma@example.com", score: 92, status: "Hot", time: "8 min ago", channel: "Facebook" },
    { name: "Alex Rodriguez", email: "alex@example.com", score: 64, status: "Cold", time: "12 min ago", channel: "Website" },
    { name: "Lisa Wang", email: "lisa@example.com", score: 81, status: "Warm", time: "15 min ago", channel: "Instagram" }
  ];

  const channelStats = [
    { channel: "Website Chat", leads: 456, conversion: "28.5%", icon: Globe },
    { channel: "WhatsApp", leads: 324, conversion: "42.1%", icon: MessageSquare },
    { channel: "Facebook", leads: 289, conversion: "31.7%", icon: MessageCircle },
    { channel: "Voice Calls", leads: 178, conversion: "55.3%", icon: Smartphone }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/20 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Bot className="h-8 w-8 text-accent" />
                <span className="text-2xl font-bold text-foreground">FursaAI</span>
              </div>
              <div className="hidden md:flex items-center space-x-6 ml-8">
                <Button variant="ghost" className="text-foreground">
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => navigate('/conversations')}
                >
                  Conversations
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => navigate('/analytics')}
                >
                  Analytics
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-background border border-border/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <Button variant="ghost" size="sm" className="p-2">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Settings className="h-5 w-5" />
              </Button>
              
              {/* User Info */}
              <div className="flex items-center space-x-2 bg-card border border-border/20 rounded-lg px-3 py-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{user?.email}</span>
              </div>
              
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-muted-foreground">Here's what's happening with your leads today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-card border border-border/20 rounded-lg px-3 py-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-transparent text-sm border-none focus:outline-none"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border border-border/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center space-x-1">
                      {stat.trend === "up" ? (
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Lead Quality Chart */}
          <Card className="bg-card border border-border/20 rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lead Quality Score</CardTitle>
                  <CardDescription>Average qualification score over time</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end space-x-2">
                {[65, 78, 82, 71, 89, 94, 87, 92, 85, 96, 91, 88].map((height, i) => (
                  <div key={i} className="flex-1 bg-primary/20 rounded-t hover:bg-primary/40 transition-colors cursor-pointer" style={{height: `${height}%`}}>
                    <div className="w-full bg-primary rounded-t" style={{height: '20%'}}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Channel Performance */}
          <Card className="bg-card border border-border/20 rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Channel Performance</CardTitle>
                  <CardDescription>Leads and conversion by channel</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {channelStats.map((channel, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <channel.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{channel.channel}</div>
                      <div className="text-sm text-muted-foreground">{channel.leads} leads</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">{channel.conversion}</div>
                    <div className="text-sm text-muted-foreground">conversion</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Leads Table */}
        <Card className="bg-card border border-border/20 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest qualified leads and their status</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-xl hover:bg-background/80 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{lead.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-foreground">{lead.score}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                    
                    <Badge 
                      className={`${
                        lead.status === 'Hot' ? 'bg-red-100 text-red-700' :
                        lead.status === 'Warm' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {lead.status}
                    </Badge>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{lead.channel}</div>
                      <div className="text-xs text-muted-foreground">{lead.time}</div>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-card border border-border/20 rounded-2xl">
              <CardHeader>
                <CardTitle>Live Activity</CardTitle>
                <CardDescription>Real-time lead interactions and AI responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { user: "Emma Davis", action: "Started conversation", channel: "Website", time: "2 min ago", status: "active" },
                  { user: "AI Assistant", action: "Qualified lead as high-intent", channel: "System", time: "2 min ago", status: "success" },
                  { user: "Mike Chen", action: "Responded to pricing question", channel: "WhatsApp", time: "5 min ago", status: "active" },
                  { user: "AI Assistant", action: "Routed lead to sales team", channel: "System", time: "6 min ago", status: "success" },
                  { user: "Sarah Johnson", action: "Downloaded product brochure", channel: "Email", time: "8 min ago", status: "active" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-background/50 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-primary'}`}></div>
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-medium text-foreground">{activity.user}</span>
                        <span className="text-muted-foreground"> {activity.action}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.channel} • {activity.time}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border border-border/20 rounded-2xl">
            <CardHeader>
              <CardTitle>AI Performance</CardTitle>
              <CardDescription>Today's AI metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Conversations Handled</span>
                  <span className="font-medium">247</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-4/5"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Accuracy Rate</span>
                  <span className="font-medium">96.8%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">4.9</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full w-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;