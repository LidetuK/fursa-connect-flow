import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Phone, Copy, ExternalLink, Plus } from 'lucide-react';
import { useWhatsAppIntegration } from '@/hooks/useWhatsAppIntegration';
import { useToast } from '@/hooks/use-toast';

export const WhatsAppIntegration = () => {
  const { integrations, loading, createIntegration } = useWhatsAppIntegration();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');

  const handleCreateIntegration = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Phone number is required",
        variant: "destructive",
      });
      return;
    }

    const result = await createIntegration(phoneNumber.trim(), businessName.trim() || undefined);
    if (result) {
      setPhoneNumber('');
      setBusinessName('');
      setIsCreateDialogOpen(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'disconnected': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading WhatsApp integrations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            WhatsApp Integration
          </h3>
          <p className="text-sm text-muted-foreground">
            Connect Twilio WhatsApp to receive and send AI-powered messages
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Connect WhatsApp
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect WhatsApp</DialogTitle>
              <DialogDescription>
                Set up a new Twilio WhatsApp integration for your business. Enter your Twilio WhatsApp phone number.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business">Business Name (Optional)</Label>
                <Input
                  id="business"
                  placeholder="Your Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              
              <Button onClick={handleCreateIntegration} className="w-full">
                Create Integration
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {integrations.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-lg font-semibold mb-2">No WhatsApp Integrations</h4>
            <p className="text-muted-foreground mb-4">
              Connect your WhatsApp to start receiving and managing conversations.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Connect WhatsApp
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {integrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    <div>
                      <CardTitle className="text-base">
                        {integration.business_name || integration.phone_number}
                      </CardTitle>
                      <CardDescription>
                        {integration.business_name && integration.phone_number}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div>
                    <Label className="text-sm font-medium">Webhook URL</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        value={integration.webhook_url || ''}
                        readOnly
                        className="text-xs"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(integration.webhook_url || '')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">n8n Token</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        value="••••••••••••••••"
                        readOnly
                        className="text-xs"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(integration.id)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Use the integration ID as your n8n webhook token
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Created: {new Date(integration.connected_at || Date.now()).toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    View in n8n
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="space-y-2">
            <p className="font-medium">1. Twilio WhatsApp Setup</p>
            <p className="text-muted-foreground">
              Set up your Twilio credentials in Supabase environment variables:
            </p>
            <div className="bg-muted p-2 rounded text-xs font-mono">
              TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
              TWILIO_AUTH_TOKEN=your_auth_token_here<br/>
              TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">2. Create WhatsApp Integration</p>
            <p className="text-muted-foreground">Click "Connect WhatsApp" and provide your Twilio WhatsApp phone number.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">3. Configure Twilio Webhook</p>
            <p className="text-muted-foreground">
              Set up the webhook URL in your Twilio Console to point to your webhook receiver.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">4. Test Integration</p>
            <p className="text-muted-foreground">
              Send test messages to your Twilio WhatsApp number to verify the integration is working.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">5. AI Auto-Reply (Optional)</p>
            <p className="text-muted-foreground">
              Set up n8n workflow for AI-powered auto-replies to incoming messages.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};