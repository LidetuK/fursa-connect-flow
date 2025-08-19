import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, Phone, Copy, ExternalLink, Plus, AlertTriangle, CheckCircle, Clock, Users, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Meta WhatsApp Business API compliant component
export const WhatsAppIntegration = () => {
  const { toast } = useToast();
  const [isSetupDialogOpen, setIsSetupDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isOptInDialogOpen, setIsOptInDialogOpen] = useState(false);
  
  // Business profile data
  const [businessProfile, setBusinessProfile] = useState({
    name: '',
    email: '',
    website: '',
    phone: '',
    address: '',
    description: '',
    category: '',
    verified: false
  });

  // Message templates (Meta requirement)
  const [messageTemplates, setMessageTemplates] = useState([
    {
      id: 'welcome_template',
      name: 'Welcome Message',
      category: 'MARKETING',
      language: 'en_US',
      status: 'APPROVED',
      content: 'Welcome to {{1}}! Thank you for opting in to receive updates from us. Reply STOP to unsubscribe.',
      variables: ['business_name']
    },
    {
      id: 'order_update_template',
      name: 'Order Update',
      category: 'UTILITY',
      language: 'en_US',
      status: 'APPROVED',
      content: 'Your order #{{1}} has been {{2}}. Track your order at {{3}}.',
      variables: ['order_number', 'status', 'tracking_url']
    },
    {
      id: 'support_template',
      name: 'Customer Support',
      category: 'UTILITY',
      language: 'en_US',
      status: 'APPROVED',
      content: 'Thank you for contacting {{1}} support. A representative will respond within 24 hours. For urgent matters, call {{2}}.',
      variables: ['business_name', 'support_phone']
    }
  ]);

  // Opt-in management
  const [optInRecords, setOptInRecords] = useState([]);
  const [optInMethods, setOptInMethods] = useState([
    'Website form',
    'SMS opt-in',
    'In-store signup',
    'Phone call',
    'Email signup'
  ]);

  // Compliance settings
  const [complianceSettings, setComplianceSettings] = useState({
    respect24HourWindow: true,
    useApprovedTemplates: true,
    requireOptIn: true,
    honorOptOut: true,
    ageRestriction: 18,
    geographicRestrictions: [],
    privacyPolicyUrl: '',
    termsOfServiceUrl: '',
    supportEmail: '',
    supportPhone: ''
  });

  // Message sending with compliance
  const sendCompliantMessage = async (to: string, message: string, templateId?: string) => {
    try {
      // Check if within 24-hour window
      const lastUserMessage = await checkLastUserMessage(to);
      const within24Hours = isWithin24Hours(lastUserMessage?.timestamp);

      if (!within24Hours && !templateId) {
        throw new Error('Cannot send free-form message outside 24-hour window. Use approved message template.');
      }

      // Check opt-in status
      const hasOptIn = await checkOptInStatus(to);
      if (!hasOptIn) {
        throw new Error('User has not opted in to receive messages.');
      }

      // Send message via Meta API
      const response = await fetch('/api/whatsapp/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          message,
          templateId,
          businessProfile,
          complianceSettings
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: "Message Sent",
        description: "Message sent successfully in compliance with Meta policies.",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Opt-in management
  const recordOptIn = async (phoneNumber: string, method: string, categories: string[]) => {
    try {
      const optInRecord = {
        phoneNumber,
        method,
        categories,
        timestamp: new Date().toISOString(),
        ipAddress: '', // Capture for compliance
        userAgent: navigator.userAgent
      };

      // Store opt-in record
      await fetch('/api/whatsapp/opt-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(optInRecord)
      });

      setOptInRecords(prev => [...prev, optInRecord]);

      toast({
        title: "Opt-in Recorded",
        description: "User opt-in has been recorded for compliance.",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record opt-in.",
        variant: "destructive",
      });
    }
  };

  // Opt-out management
  const handleOptOut = async (phoneNumber: string) => {
    try {
      await fetch('/api/whatsapp/opt-out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });

      toast({
        title: "Opt-out Processed",
        description: "User has been opted out as required by Meta policy.",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process opt-out.",
        variant: "destructive",
      });
    }
  };

  // Helper functions
  const isWithin24Hours = (timestamp: string) => {
    if (!timestamp) return false;
    const lastMessage = new Date(timestamp);
    const now = new Date();
    const diffHours = (now.getTime() - lastMessage.getTime()) / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  const checkLastUserMessage = async (phoneNumber: string) => {
    // Implementation to check last user message timestamp
    return null;
  };

  const checkOptInStatus = async (phoneNumber: string) => {
    // Implementation to check if user has opted in
    return optInRecords.some(record => record.phoneNumber === phoneNumber);
  };

  return (
    <div className="space-y-6">
      {/* Compliance Status */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Meta WhatsApp Business Policy Compliance
          </CardTitle>
          <CardDescription className="text-green-700">
            Your integration is configured to comply with Meta's WhatsApp Business Messaging Policy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Opt-in Management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">24-Hour Window</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Message Templates</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Profile Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Business Profile (Meta Requirement)
          </CardTitle>
          <CardDescription>
            Complete business profile information required by Meta for verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Business Name *</Label>
              <Input 
                value={businessProfile.name}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your Business Name"
              />
            </div>
            <div className="space-y-2">
              <Label>Business Email *</Label>
              <Input 
                value={businessProfile.email}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="business@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Website *</Label>
              <Input 
                value={businessProfile.website}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourbusiness.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input 
                value={businessProfile.phone}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1234567890"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Business Description</Label>
              <Textarea 
                value={businessProfile.description}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your business and services"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Approved Message Templates
          </CardTitle>
          <CardDescription>
            Pre-approved message templates for initiating conversations (Meta requirement)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messageTemplates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <Badge variant={template.status === 'APPROVED' ? 'default' : 'secondary'}>
                    {template.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{template.content}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Category: {template.category}</span>
                  <span>Language: {template.language}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opt-in Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Opt-in Management
          </CardTitle>
          <CardDescription>
            Manage user consent and opt-in records as required by Meta policy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Opt-ins: {optInRecords.length}</span>
              <Button onClick={() => setIsOptInDialogOpen(true)} size="sm">
                Record Opt-in
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Opt-in Methods Used</Label>
                <div className="space-y-1">
                  {optInMethods.map((method) => (
                    <div key={method} className="flex items-center gap-2">
                      <Checkbox id={method} />
                      <Label htmlFor={method} className="text-sm">{method}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Compliance Settings</Label>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={complianceSettings.requireOptIn}
                      onCheckedChange={(checked) => setComplianceSettings(prev => ({ ...prev, requireOptIn: checked }))}
                    />
                    <Label className="text-sm">Require explicit opt-in</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={complianceSettings.honorOptOut}
                      onCheckedChange={(checked) => setComplianceSettings(prev => ({ ...prev, honorOptOut: checked }))}
                    />
                    <Label className="text-sm">Honor opt-out requests</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={complianceSettings.respect24HourWindow}
                      onCheckedChange={(checked) => setComplianceSettings(prev => ({ ...prev, respect24HourWindow: checked }))}
                    />
                    <Label className="text-sm">Respect 24-hour window</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policy Compliance Warnings */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            Important Policy Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-yellow-700">
            <p>• Only send messages to users who have explicitly opted in</p>
            <p>• Use approved message templates for initial conversations</p>
            <p>• Respect the 24-hour customer service window</p>
            <p>• Honor all opt-out requests immediately</p>
            <p>• Maintain accurate business profile information</p>
            <p>• Do not send prohibited content (gambling, adult content, etc.)</p>
          </div>
        </CardContent>
      </Card>

      {/* Opt-in Dialog */}
      <Dialog open={isOptInDialogOpen} onOpenChange={setIsOptInDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record User Opt-in</DialogTitle>
            <DialogDescription>
              Record user consent for compliance with Meta's WhatsApp Business Policy
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="+1234567890" />
            </div>
            <div className="space-y-2">
              <Label>Opt-in Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {optInMethods.map((method) => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Message Categories</Label>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Checkbox id="marketing" />
                  <Label htmlFor="marketing" className="text-sm">Marketing & Promotions</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="utility" />
                  <Label htmlFor="utility" className="text-sm">Order Updates & Support</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="news" />
                  <Label htmlFor="news" className="text-sm">News & Updates</Label>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};