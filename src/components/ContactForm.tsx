import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Check, ArrowRight, Users, Building, Target, Rocket } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  // Step 1: Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2: Company Info
  companyName: string;
  companySize: string;
  industry: string;
  website: string;
  
  // Step 3: Use Case
  currentLeadProcess: string;
  leadVolume: string;
  challenges: string;
  goals: string;
  
  // Step 4: Implementation
  timeline: string;
  budget: string;
  additionalInfo: string;
}

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    companySize: '',
    industry: '',
    website: '',
    currentLeadProcess: '',
    leadVolume: '',
    challenges: '',
    goals: '',
    timeline: '',
    budget: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email);
      case 2:
        return !!(formData.companyName && formData.companySize && formData.industry);
      case 3:
        return !!(formData.currentLeadProcess && formData.leadVolume && formData.challenges);
      case 4:
        return !!(formData.timeline && formData.budget);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Form Submitted Successfully!",
        description: "Our team will contact you within 24 hours to schedule your demo.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        companySize: '',
        industry: '',
        website: '',
        currentLeadProcess: '',
        leadVolume: '',
        challenges: '',
        goals: '',
        timeline: '',
        budget: '',
        additionalInfo: ''
      });
      setCurrentStep(1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Users className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-2xl font-bold text-foreground">Let's Get Started</h3>
              <p className="text-muted-foreground">Tell us about yourself</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="john@company.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Building className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-2xl font-bold text-foreground">Company Information</h3>
              <p className="text-muted-foreground">Help us understand your business</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  placeholder="Acme Corp"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size *</Label>
                <Select value={formData.companySize} onValueChange={(value) => updateFormData('companySize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  placeholder="https://www.company.com"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Target className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-2xl font-bold text-foreground">Your Use Case</h3>
              <p className="text-muted-foreground">Tell us about your current lead process</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentLeadProcess">Current Lead Process *</Label>
                <Select value={formData.currentLeadProcess} onValueChange={(value) => updateFormData('currentLeadProcess', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How do you currently handle leads?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual follow-up via email/phone</SelectItem>
                    <SelectItem value="basic-automation">Basic email automation</SelectItem>
                    <SelectItem value="crm">CRM with some automation</SelectItem>
                    <SelectItem value="chatbot">Simple chatbot</SelectItem>
                    <SelectItem value="none">No formal process</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="leadVolume">Monthly Lead Volume *</Label>
                <Select value={formData.leadVolume} onValueChange={(value) => updateFormData('leadVolume', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How many leads do you get monthly?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50">0-50 leads</SelectItem>
                    <SelectItem value="51-200">51-200 leads</SelectItem>
                    <SelectItem value="201-500">201-500 leads</SelectItem>
                    <SelectItem value="501-1000">501-1000 leads</SelectItem>
                    <SelectItem value="1000+">1000+ leads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="challenges">Biggest Challenges *</Label>
                <Textarea
                  id="challenges"
                  value={formData.challenges}
                  onChange={(e) => updateFormData('challenges', e.target.value)}
                  placeholder="What are your biggest challenges with lead qualification and follow-up?"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goals">Goals</Label>
                <Textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => updateFormData('goals', e.target.value)}
                  placeholder="What are you hoping to achieve with FursaAI?"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Rocket className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-2xl font-bold text-foreground">Implementation Details</h3>
              <p className="text-muted-foreground">Let's plan your journey</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">Implementation Timeline *</Label>
                <Select value={formData.timeline} onValueChange={(value) => updateFormData('timeline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="When would you like to get started?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="1-month">Within 1 month</SelectItem>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="just-exploring">Just exploring options</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range *</Label>
                <Select value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="What's your monthly budget?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-500">Under $500/month</SelectItem>
                    <SelectItem value="500-1000">$500-$1,000/month</SelectItem>
                    <SelectItem value="1000-2500">$1,000-$2,500/month</SelectItem>
                    <SelectItem value="2500-5000">$2,500-$5,000/month</SelectItem>
                    <SelectItem value="5000+">$5,000+/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                  placeholder="Anything else you'd like us to know?"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Get Access to FursaAI Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards automated lead qualification. Our team will set up a personalized demo for your business.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-background shadow-2xl border border-border">
            <CardHeader className="text-center">
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      step < currentStep 
                        ? 'bg-primary border-primary text-primary-foreground'
                        : step === currentStep 
                        ? 'border-primary text-primary'
                        : 'border-muted-foreground text-muted-foreground'
                    }`}>
                      {step < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-semibold">{step}</span>
                      )}
                    </div>
                    {step < 4 && (
                      <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                        step < currentStep ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center space-x-2 mb-6">
                <Badge variant="secondary">Step {currentStep} of {totalSteps}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {renderStepContent()}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!validateStep(currentStep) || isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Demo Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;