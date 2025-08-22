import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Users,
  Lock,
  Eye,
  Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-background border-b border-border/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">FursaAI</span>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              How we collect, use, and protect your information
            </p>
            <div className="flex items-center justify-center mt-4 space-x-4">
              <Badge className="bg-primary/10 text-primary">Last Updated: January 2025</Badge>
              <Badge variant="outline">Version 1.0</Badge>
            </div>
          </div>

          {/* Policy Content */}
          <div className="space-y-12">
            {/* Overview Section */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-foreground leading-relaxed mb-4">
                  At FursaAI, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                  AI-powered lead qualification platform and WhatsApp Business API integration services.
                </p>
                <p className="text-foreground leading-relaxed">
                  By using FursaAI's services, you agree to the collection and use of information in accordance with this policy. 
                  We are committed to complying with all applicable data protection laws and regulations, including GDPR, CCPA, 
                  and WhatsApp Business Messaging Policy requirements.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Personal Information</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Name, email address, and phone number when you create an account</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Business information including company name, industry, and contact details</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>WhatsApp Business API credentials and configuration data</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Usage Data</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Conversation logs and message content (processed for lead qualification)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Analytics data including response times, conversion rates, and user interactions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>System logs and technical data for service optimization and security</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Lead Data</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Contact information of leads who opt-in to receive WhatsApp messages</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Conversation history and qualification data for lead scoring</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Opt-in consent records and preferences</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Globe className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">How We Use Your Information</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Service Provision</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Provide and maintain our AI lead qualification services</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Process WhatsApp messages and manage opt-in compliance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Generate lead qualification scores and insights</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Improvement & Analytics</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Improve our AI algorithms and service quality</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Analyze usage patterns and optimize performance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Provide customer support and technical assistance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Lock className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">Data Protection & Security</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Security Measures</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>End-to-end encryption for all data transmission</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Secure cloud infrastructure with industry-standard security protocols</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Regular security audits and penetration testing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Access controls and authentication mechanisms</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Data Retention</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Account data: Retained for the duration of your subscription plus 30 days</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Conversation logs: Retained for 12 months for service improvement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Lead data: Retained according to your specified retention period</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Compliance */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <FileText className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">WhatsApp Business Policy Compliance</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Opt-in Requirements</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Explicit, verifiable opt-in permission required for all WhatsApp communications</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span>24-hour messaging window compliance for customer service conversations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Approved message templates required for initial outreach</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Your Responsibilities</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Ensure proper opt-in consent collection and documentation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Maintain accurate business profile information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Provide clear opt-out mechanisms for all communications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Comply with all applicable local and international privacy laws</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Data Sharing & Third Parties</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Service Providers</h3>
                    <p className="text-foreground mb-3">
                      We may share your information with trusted third-party service providers who assist us in:
                    </p>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Cloud hosting and infrastructure services</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>WhatsApp Business API integration and compliance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Customer support and analytics services</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Legal Requirements</h3>
                    <p className="text-foreground">
                      We may disclose your information if required by law, regulation, or legal process, 
                      or to protect our rights, property, or safety, or that of our users or the public.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Your Rights & Choices</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Access & Control</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Access and download your personal data</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Update or correct inaccurate information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Request deletion of your data (subject to legal requirements)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Communication Preferences</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Opt-out of marketing communications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Manage notification settings</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Control data processing preferences</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Us</h2>
                
                <div className="space-y-4">
                  <p className="text-foreground">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                      <p className="text-foreground">privacy@fursaai.com</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Data Protection Officer</h3>
                      <p className="text-foreground">dpo@fursaai.com</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      <strong>Note:</strong> For questions about WhatsApp Business Policy compliance or account suspensions, 
                      please refer to the WhatsApp Business Help Center or contact WhatsApp directly, as FursaAI cannot 
                      reverse WhatsApp's enforcement decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-border/20">
            <p className="text-muted-foreground">
              © 2025 FursaAI. All rights reserved. This Privacy Policy is effective as of January 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
