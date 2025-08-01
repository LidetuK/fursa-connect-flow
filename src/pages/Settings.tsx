import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Settings as SettingsIcon,
  Bell,
  User,
  LogOut,
  ArrowLeft,
  Shield,
  Globe,
  MessageSquare,
  Smartphone,
  Mail,
  Zap,
  Palette,
  Moon,
  Sun,
  Monitor,
  Save,
  Trash2,
  Download,
  Upload,
  Key,
  Database,
  Webhook,
  BellRing,
  Volume2,
  VolumeX,
  Languages,
  Clock,
  Calendar,
  Target,
  BarChart3,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  // Profile Settings
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: user?.email || "",
    company: "FursaAI",
    role: "Admin",
    phone: "+1 (555) 123-4567"
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newLeadAlerts: true,
    conversionAlerts: true,
    systemUpdates: false,
    marketingEmails: false
  });

  // AI Settings
  const [aiSettings, setAiSettings] = useState({
    autoResponse: true,
    leadScoring: true,
    smartRouting: true,
    sentimentAnalysis: true,
    languageDetection: true,
    customPrompts: false,
    aiModel: "gpt-4",
    responseSpeed: "fast"
  });

  // Integration Settings
  const [integrations, setIntegrations] = useState({
    n8n: { enabled: true, status: "connected" },
    crm: { enabled: false, status: "disconnected" },
    email: { enabled: true, status: "connected" },
    whatsapp: { enabled: true, status: "connected" },
    facebook: { enabled: false, status: "disconnected" },
    slack: { enabled: false, status: "disconnected" }
  });

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

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate saving settings
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "ai", label: "AI Settings", icon: Bot },
    { id: "integrations", label: "Integrations", icon: Webhook },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-700';
      case 'disconnected': return 'bg-gray-100 text-gray-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

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
                <Button variant="ghost" onClick={() => navigate('/analytics')} className="text-muted-foreground hover:text-foreground">
                  Analytics
                </Button>
                <Button variant="ghost" className="text-foreground">
                  Settings
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <SettingsIcon className="h-5 w-5" />
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
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and configurations</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-card border border-border/20 rounded-2xl">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <Card className="bg-card border border-border/20 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Profile Settings</span>
                    </CardTitle>
                    <CardDescription>Update your personal information and account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <Card className="bg-card border border-border/20 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>Notification Preferences</span>
                    </CardTitle>
                    <CardDescription>Configure how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                        </div>
                        <Switch
                          checked={notifications.pushNotifications}
                          onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>New Lead Alerts</Label>
                          <p className="text-sm text-muted-foreground">Get notified when new leads are qualified</p>
                        </div>
                        <Switch
                          checked={notifications.newLeadAlerts}
                          onCheckedChange={(checked) => setNotifications({...notifications, newLeadAlerts: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Conversion Alerts</Label>
                          <p className="text-sm text-muted-foreground">Get notified when leads convert</p>
                        </div>
                        <Switch
                          checked={notifications.conversionAlerts}
                          onCheckedChange={(checked) => setNotifications({...notifications, conversionAlerts: checked})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Settings */}
              {activeTab === "ai" && (
                <Card className="bg-card border border-border/20 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="h-5 w-5" />
                      <span>AI Configuration</span>
                    </CardTitle>
                    <CardDescription>Customize your AI assistant behavior and capabilities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Auto Response</Label>
                          <p className="text-sm text-muted-foreground">Enable automatic AI responses to leads</p>
                        </div>
                        <Switch
                          checked={aiSettings.autoResponse}
                          onCheckedChange={(checked) => setAiSettings({...aiSettings, autoResponse: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Lead Scoring</Label>
                          <p className="text-sm text-muted-foreground">Automatically score leads based on AI analysis</p>
                        </div>
                        <Switch
                          checked={aiSettings.leadScoring}
                          onCheckedChange={(checked) => setAiSettings({...aiSettings, leadScoring: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Smart Routing</Label>
                          <p className="text-sm text-muted-foreground">Route leads to appropriate team members</p>
                        </div>
                        <Switch
                          checked={aiSettings.smartRouting}
                          onCheckedChange={(checked) => setAiSettings({...aiSettings, smartRouting: checked})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>AI Model</Label>
                      <select
                        value={aiSettings.aiModel}
                        onChange={(e) => setAiSettings({...aiSettings, aiModel: e.target.value})}
                        className="w-full p-2 border border-border rounded-lg bg-background"
                      >
                        <option value="gpt-4">GPT-4 (Recommended)</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="claude-3">Claude-3</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Integrations */}
              {activeTab === "integrations" && (
                <Card className="bg-card border border-border/20 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Webhook className="h-5 w-5" />
                      <span>Integrations</span>
                    </CardTitle>
                    <CardDescription>Manage your third-party integrations and connections</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(integrations).map(([key, integration]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {key === 'n8n' && <Zap className="h-5 w-5 text-primary" />}
                            {key === 'crm' && <Database className="h-5 w-5 text-primary" />}
                            {key === 'email' && <Mail className="h-5 w-5 text-primary" />}
                            {key === 'whatsapp' && <MessageSquare className="h-5 w-5 text-primary" />}
                            {key === 'facebook' && <Globe className="h-5 w-5 text-primary" />}
                            {key === 'slack' && <Bell className="h-5 w-5 text-primary" />}
                          </div>
                          <div>
                            <div className="font-medium text-foreground capitalize">{key}</div>
                            <div className="text-sm text-muted-foreground">{integration.status}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(integration.status)}>
                            {integration.status}
                          </Badge>
                          <Switch
                            checked={integration.enabled}
                            onCheckedChange={(checked) => setIntegrations({
                              ...integrations,
                              [key]: {...integration, enabled: checked}
                            })}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <Card className="bg-card border border-border/20 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Security Settings</span>
                    </CardTitle>
                    <CardDescription>Manage your account security and privacy settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Key className="h-4 w-4 mr-2" />
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Session Management</Label>
                          <p className="text-sm text-muted-foreground">Manage active sessions and devices</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4 mr-2" />
                          View Sessions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Appearance */}
              {activeTab === "appearance" && (
                <Card className="bg-card border border-border/20 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="h-5 w-5" />
                      <span>Appearance</span>
                    </CardTitle>
                    <CardDescription>Customize the look and feel of your dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Theme</Label>
                          <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Sun className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Moon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Monitor className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Save Button */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Settings
                </Button>
                <Button onClick={handleSaveSettings} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings; 