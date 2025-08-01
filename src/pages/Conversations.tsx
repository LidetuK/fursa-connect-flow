import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  MessageSquare, 
  Send,
  Search,
  Filter,
  MoreVertical,
  User,
  LogOut,
  Settings,
  Bell,
  Phone,
  Mail,
  Globe,
  Smartphone,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  channel?: 'website' | 'whatsapp' | 'facebook' | 'email';
}

interface Conversation {
  id: string;
  leadName: string;
  leadEmail: string;
  channel: 'website' | 'whatsapp' | 'facebook' | 'email';
  status: 'active' | 'pending' | 'closed';
  lastMessage: string;
  lastActivity: Date;
  unreadCount: number;
  leadScore: number;
}

const Conversations = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = [
    {
      id: "1",
      leadName: "Sarah Johnson",
      leadEmail: "sarah@example.com",
      channel: "website",
      status: "active",
      lastMessage: "What are your pricing plans?",
      lastActivity: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      unreadCount: 2,
      leadScore: 89
    },
    {
      id: "2",
      leadName: "Mike Chen",
      leadEmail: "mike@example.com",
      channel: "whatsapp",
      status: "active",
      lastMessage: "I'm interested in the enterprise plan",
      lastActivity: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      unreadCount: 0,
      leadScore: 76
    },
    {
      id: "3",
      leadName: "Emma Davis",
      leadEmail: "emma@example.com",
      channel: "facebook",
      status: "pending",
      lastMessage: "Can you send me more information?",
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      unreadCount: 1,
      leadScore: 92
    },
    {
      id: "4",
      leadName: "Alex Rodriguez",
      leadEmail: "alex@example.com",
      channel: "email",
      status: "closed",
      lastMessage: "Thank you for your help!",
      lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      unreadCount: 0,
      leadScore: 64
    }
  ];

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
      channel: selectedConversation.channel
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Thank you for your message! I'm here to help you with any questions about our services.",
        "That's a great question! Let me provide you with some detailed information about that.",
        "I understand your interest. Our team specializes in exactly what you're looking for.",
        "Based on your inquiry, I think our solution would be perfect for your needs.",
        "I'd be happy to connect you with one of our specialists to discuss this further."
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
        status: 'delivered',
        channel: selectedConversation.channel
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'website': return <Globe className="h-4 w-4" />;
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      case 'facebook': return <MessageSquare className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredConversations = conversations.filter(conv =>
    conv.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.leadEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <Button variant="ghost" className="text-foreground">
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
      <div className="flex h-[calc(100vh-80px)]">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-border/20 bg-card">
          <div className="p-4 border-b border-border/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
              <Badge className="bg-primary text-primary-foreground">
                {conversations.filter(c => c.unreadCount > 0).length}
              </Badge>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex space-x-2 mb-4">
              <Button variant="outline" size="sm" className="text-xs">
                <Filter className="h-3 w-3 mr-1" />
                All
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Active
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Pending
              </Button>
            </div>
          </div>

          {/* Conversation List */}
          <div className="overflow-y-auto h-full">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-border/20 cursor-pointer hover:bg-background/50 transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-primary/5 border-primary/20' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-foreground truncate">
                        {conversation.leadName}
                      </span>
                      <Badge className={`text-xs ${getStatusColor(conversation.status)}`}>
                        {conversation.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-1">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      {getChannelIcon(conversation.channel)}
                      <span>{formatTime(conversation.lastActivity)}</span>
                      <span>• Score: {conversation.leadScore}</span>
                    </div>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border/20 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {selectedConversation.leadName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{selectedConversation.leadName}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {getChannelIcon(selectedConversation.channel)}
                        <span>{selectedConversation.leadEmail}</span>
                        <span>• Score: {selectedConversation.leadScore}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(selectedConversation.status)}>
                      {selectedConversation.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground mt-8">
                    <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p>Start a conversation with {selectedConversation.leadName}</p>
                    <p className="text-sm">AI assistant is ready to help!</p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center justify-between mt-1 text-xs ${
                        message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {message.sender === 'user' && (
                          <div className="flex items-center space-x-1">
                            {message.status === 'sent' && <CheckCircle className="h-3 w-3" />}
                            {message.status === 'delivered' && <CheckCircle className="h-3 w-3" />}
                            {message.status === 'read' && <CheckCircle className="h-3 w-3" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground max-w-xs lg:max-w-md px-4 py-2 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">AI is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border/20 bg-card">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="min-h-[44px]"
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isTyping}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p>Choose a conversation from the sidebar to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversations; 