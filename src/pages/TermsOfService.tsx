import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Shield,
  Users,
  Lock,
  Scale,
  Globe,
  Gavel,
  BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
              <FileText className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              The terms and conditions governing your use of FursaAI services
            </p>
            <div className="flex items-center justify-center mt-4 space-x-4">
              <Badge className="bg-primary/10 text-primary">Last Updated: January 2025</Badge>
              <Badge variant="outline">Version 1.0</Badge>
            </div>
          </div>

          {/* Terms Content */}
          <div className="space-y-12">
            {/* Introduction */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-foreground leading-relaxed mb-4">
                  You and the company or business that you are authorized to represent ("you," "your," or "Company") 
                  agree to these FursaAI Terms of Service and all other applicable terms, policies, and documentation 
                  (collectively, "Terms") by accessing or using FursaAI's AI-powered lead qualification platform and 
                  WhatsApp Business API integration services ("Services").
                </p>
                <p className="text-foreground leading-relaxed mb-4">
                  FursaAI provides our Services solely for your business or commercial use. These Terms incorporate 
                  by reference our Privacy Policy, Acceptable Use Policy, and all other policies referenced herein.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-orange-800 mb-1">Important Notice</p>
                      <p className="text-sm text-orange-700">
                        Our Services do not provide access to emergency services. Company should ensure that it can 
                        contact its relevant emergency services providers through appropriate channels.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account and Registration */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">2. Account and Registration</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Business Use and Eligibility</h3>
                    <p className="text-foreground mb-3">You represent and warrant that you:</p>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Will use our Services solely for business, commercial, and authorized purposes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Will only provide registration information associated with your Company</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Are authorized to enter into these Terms and are at least 18 years old</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Have not been previously suspended or removed from our Services</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Account Information</h3>
                    <p className="text-foreground mb-3">
                      Company must create a FursaAI account by providing accurate, current, and complete information, 
                      including its valid legal business phone number, Company name, and other information we require.
                    </p>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Keep account information updated and accurate</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Maintain security of account credentials and devices</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Notify us immediately of any security breaches or unauthorized access</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal and Compliance */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Gavel className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">3. Legal and Compliance Responsibilities</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Compliance with Laws</h3>
                    <p className="text-foreground mb-3">
                      You may only use our Services if you have ensured that your use complies with all legal and 
                      regulatory requirements applicable to Company. It is your sole responsibility to determine your legal obligations.
                    </p>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Comply with all applicable data protection and privacy laws (GDPR, CCPA, etc.)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Provide all necessary data disclosures and notices</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Secure all necessary rights, consents, and permissions for data processing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Honor all user requests to stop or opt-out of communications</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">WhatsApp Business Policy Compliance</h3>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="text-foreground mb-3">
                        As a WhatsApp Business API user, you must comply with WhatsApp's Business Messaging Policy:
                      </p>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Explicit opt-in permission required for all WhatsApp communications</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                          <span>24-hour messaging window compliance for customer service conversations</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Approved message templates required for initial outreach</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Prohibited content and industries restrictions apply</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acceptable Use */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">4. Acceptable Use of Our Services</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Prohibited Activities</h3>
                    <p className="text-foreground mb-3">Company will not (nor assist others to):</p>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Use our Services for personal, family, or household purposes</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Engage in harassing, threatening, or predatory conduct</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Impersonate or misrepresent affiliation with any person or entity</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Send spam, unsolicited communications, or chain letters</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Post unlawful, defamatory, or objectionable content</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Distribute viruses or other harmful content</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Enforcement</h3>
                    <p className="text-foreground">
                      We may review, remove, or delete content that violates these Terms. If we determine that you 
                      have breached these Terms, we have the right to limit, suspend, or terminate your account. 
                      In the event of termination, you will not create another account without our express written permission.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data and Privacy */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Lock className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">5. Data and Privacy</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Customer Data</h3>
                    <p className="text-foreground mb-3">
                      Company provides customer contact information to FursaAI and determines which of its customers 
                      it may communicate with using our Services.
                    </p>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>You are the Controller of your customer data</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>FursaAI processes data as your Processor under applicable data protection laws</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>You must secure all necessary consents and permissions</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Data Processing</h3>
                    <p className="text-foreground mb-3">
                      FursaAI collects, stores, and uses information to provide, operate, and improve our Services:
                    </p>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Account and registration information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Usage, log, and functional information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Performance, diagnostics, and analytics information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Support request information</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Global Operations</h3>
                    <p className="text-foreground">
                      Company agrees to the transfer and processing of information to the United States and other 
                      countries globally where we have facilities, service providers, or partners, regardless of 
                      where you use our Services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">6. Intellectual Property</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Company License to FursaAI</h3>
                    <p className="text-foreground mb-3">
                      You grant FursaAI a worldwide, non-exclusive, sub-licensable, and transferable license to use, 
                      reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and 
                      publicly perform or display Company Content that you upload, submit, store, send, or receive 
                      on or through our Services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">FursaAI's Rights</h3>
                    <p className="text-foreground mb-3">
                      We own all copyrights, trademarks, domains, logos, trade dress, trade secrets, patents, and 
                      other intellectual property rights associated with our Services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Restrictions</h3>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Do not distribute, sell, resell, or rent our Services to third parties</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Do not reverse engineer any aspect of our Services</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Do not scrape or extract data from our Services</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Do not create competing services that utilize our platform</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">7. Service Availability</h2>
                
                <p className="text-foreground mb-4">
                  Our Services may be interrupted, including for maintenance, repairs, upgrades, or network or 
                  equipment failures. We reserve the right to discontinue some or all of our Services, in our 
                  sole discretion, including certain features and the support for certain devices and platforms.
                </p>
                
                <p className="text-foreground">
                  Events beyond our control may affect our Services, such as events in nature and other force 
                  majeure events. If we discontinue all of our Services, we will give you advance notice as 
                  required by law, and otherwise reasonable advance notice.
                </p>
              </CardContent>
            </Card>

            {/* Disclaimers and Limitations */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">8. Disclaimers and Limitations</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Disclaimer of Warranties</h3>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-800 font-medium mb-2">IMPORTANT DISCLAIMER</p>
                      <p className="text-sm text-red-700">
                        COMPANY USES OUR SERVICES AT ITS OWN RISK. WE PROVIDE OUR SERVICES ON AN "AS IS" BASIS 
                        WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF 
                        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND FREEDOM 
                        FROM COMPUTER VIRUS OR OTHER HARMFUL CODE.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Limitation of Liability</h3>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm text-orange-800 font-medium mb-2">LIABILITY LIMITATION</p>
                      <p className="text-sm text-orange-700">
                        TO THE EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE TO COMPANY FOR ANY LOST PROFITS 
                        OR CONSEQUENTIAL, SPECIAL, PUNITIVE, INDIRECT, OR INCIDENTAL DAMAGES. OUR AGGREGATE 
                        LIABILITY WILL NOT EXCEED THE GREATER OF ONE HUNDRED DOLLARS ($100) OR THE AMOUNT 
                        COMPANY HAS PAID US IN THE PAST TWELVE MONTHS.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Indemnification</h3>
                    <p className="text-foreground">
                      To the maximum extent permitted by applicable law, Company agrees to defend, indemnify, 
                      and hold harmless FursaAI from and against all liabilities, damages, losses, and expenses 
                      of any kind relating to, arising out of, or in any way in connection with Company's use 
                      of our Services or breach of these Terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">9. Termination</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Termination by FursaAI</h3>
                    <p className="text-foreground mb-3">
                      We may modify, suspend, or terminate Company's access to or use of our Services and these 
                      Terms at any time and for any reason, including if we determine that Company violates these 
                      Terms, receives excessive negative feedback, or creates harm, risk, or possible legal exposure.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Termination by Company</h3>
                    <p className="text-foreground mb-3">
                      You may discontinue your use of, or terminate, the Services at any time by providing us 
                      written notice. Upon termination, you must promptly discontinue all use of our Services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Data Retention</h3>
                    <p className="text-foreground">
                      Upon termination, we will retain data associated with your account for up to 90 days, 
                      including data you have provided to us or which we have collected from your use of the Services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Scale className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">10. Governing Law and Disputes</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Governing Law</h3>
                    <p className="text-foreground">
                      These Terms are governed by the laws of the State of California, without regard to conflict 
                      of law provisions. Any disputes will be resolved exclusively in the courts of San Mateo County, California.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Amendments</h3>
                    <p className="text-foreground">
                      We may amend or update these Terms at any time. Changes become effective upon publication. 
                      Your continued use of our Services confirms your acceptance of these Terms as amended.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Severability</h3>
                    <p className="text-foreground">
                      If any provision of these Terms is deemed unlawful, void, or unenforceable, that provision 
                      shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-card/50 border border-border/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">11. Contact Information</h2>
                
                <div className="space-y-4">
                  <p className="text-foreground">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Legal Department</h3>
                      <p className="text-foreground">legal@fursaai.com</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Support</h3>
                      <p className="text-foreground">support@fursaai.com</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      <strong>Note:</strong> For questions about WhatsApp Business Policy compliance or account 
                      suspensions, please refer to the WhatsApp Business Help Center or contact WhatsApp directly, 
                      as FursaAI cannot reverse WhatsApp's enforcement decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-border/20">
            <p className="text-muted-foreground">
              © 2025 FursaAI. All rights reserved. These Terms of Service are effective as of January 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
