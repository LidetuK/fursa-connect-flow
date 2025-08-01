import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  TrendingUp,
  TrendingDown,
  BarChart3,
  Settings,
  Bell,
  Search,
  User,
  LogOut,
  ArrowLeft,
  Calendar,
  Filter,
  Download,
  Eye,
  Users,
  MessageSquare,
  DollarSign,
  Target,
  Globe,
  Smartphone,
  Mail,
  Activity,
  PieChart,
  LineChart,
  BarChart2,
  Clock,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Analytics = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("conversions");

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

  const overviewMetrics = [
    {
      title: "Total Leads",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Conversion Rate",
      value: "34.2%",
      change: "+6.8%",
      trend: "up",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Revenue Generated",
      value: "$284K",
      change: "+18.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Avg Response Time",
      value: "1.8s",
      change: "-15.3%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const channelPerformance = [
    { channel: "Website Chat", leads: 1247, conversion: "28.5%", revenue: "$89K", icon: Globe },
    { channel: "WhatsApp", leads: 892, conversion: "42.1%", revenue: "$67K", icon: MessageSquare },
    { channel: "Facebook", leads: 456, conversion: "31.7%", revenue: "$45K", icon: MessageSquare },
    { channel: "Email", leads: 252, conversion: "18.9%", revenue: "$23K", icon: Mail }
  ];

  const leadQualityData = [
    { score: "90-100", count: 234, percentage: 8.2, color: "bg-green-500" },
    { score: "80-89", count: 456, percentage: 16.0, color: "bg-blue-500" },
    { score: "70-79", count: 789, percentage: 27.7, color: "bg-yellow-500" },
    { score: "60-69", count: 567, percentage: 19.9, color: "bg-orange-500" },
    { score: "50-59", count: 234, percentage: 8.2, color: "bg-red-500" },
    { score: "Below 50", count: 567, percentage: 19.9, color: "bg-gray-500" }
  ];

  const timeSeriesData = [
    { date: "Jan", leads: 245, conversions: 89, revenue: 45 },
    { date: "Feb", leads: 312, conversions: 124, revenue: 67 },
    { date: "Mar", leads: 289, conversions: 98, revenue: 52 },
    { date: "Apr", leads: 356, conversions: 134, revenue: 78 },
    { date: "May", leads: 423, conversions: 167, revenue: 89 },
    { date: "Jun", leads: 398, conversions: 145, revenue: 76 }
  ];

  const aiPerformanceMetrics = [
    { metric: "Conversations Handled", value: "12,847", change: "+23.4%", trend: "up" },
    { metric: "Accuracy Rate", value: "96.8%", change: "+2.1%", trend: "up" },
    { metric: "Customer Satisfaction", value: "4.9/5", change: "+0.3", trend: "up" },
    { metric: "Response Time", value: "1.2s", change: "-18.7%", trend: "down" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/20 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div className="flex items-center space-x-3">
                <Bot className="h-8 w-8 text-accent" />
                <span className="text-2xl font-bold text-foreground">FursaAI</span>
              </div>
              <div className="hidden md:flex items-center space-x-6 ml-8">
                <Button variant="ghost" onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={() => navigate('/conversations')} className="text-muted-foreground hover:text-foreground">
                  Conversations
                </Button>
                <Button variant="ghost" className="text-foreground">
                  Analytics
                </Button>
                <Button variant="ghost" onClick={() => navigate('/settings')} className="text-muted-foreground hover:text-foreground">
                  Settings
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
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
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive insights into your lead qualification performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-card border border-border/20 rounded-lg px-3 py-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-transparent text-sm border-none focus:outline-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewMetrics.map((metric, index) => (
            <Card key={index} className="bg-card border border-border/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <div className="flex items-center space-x-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${metric.bgColor} flex items-center justify-center`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Lead Quality Distribution */}
          <Card className="bg-card border border-border/20 rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lead Quality Distribution</CardTitle>
                  <CardDescription>Distribution of leads by quality score</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadQualityData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-sm font-medium text-foreground">{item.score}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">{item.count} leads</span>
                        <span className="text-sm font-medium text-foreground">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
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
                  <CardDescription>Performance metrics by channel</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channelPerformance.map((channel, index) => (
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
                      <div className="text-sm text-muted-foreground">{channel.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Performance Metrics */}
        <Card className="bg-card border border-border/20 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>AI Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for AI assistant</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Activity className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiPerformanceMetrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-background/50 rounded-xl">
                  <div className="text-2xl font-bold text-foreground mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{metric.metric}</div>
                  <div className="flex items-center justify-center space-x-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Series Chart */}
        <Card className="bg-card border border-border/20 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Monthly performance over time</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={selectedMetric === "leads" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setSelectedMetric("leads")}
                >
                  Leads
                </Button>
                <Button 
                  variant={selectedMetric === "conversions" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setSelectedMetric("conversions")}
                >
                  Conversions
                </Button>
                <Button 
                  variant={selectedMetric === "revenue" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setSelectedMetric("revenue")}
                >
                  Revenue
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-2">
              {timeSeriesData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="text-xs text-muted-foreground">{data.date}</div>
                  <div 
                    className="w-full bg-primary/20 rounded-t hover:bg-primary/40 transition-colors cursor-pointer relative group"
                    style={{height: `${(data[selectedMetric as keyof typeof data] as number) / 500 * 100}%`}}
                  >
                    <div className="w-full bg-primary rounded-t" style={{height: '20%'}}></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {data[selectedMetric as keyof typeof data]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics; 