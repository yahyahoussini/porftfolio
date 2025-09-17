import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Settings, 
  CheckCircle, 
  ExternalLink,
  Zap
} from 'lucide-react';
import { useSEOSettings } from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';

const SEOSetup = () => {
  const { settings, updateSettings, loading } = useSEOSettings();
  const { toast } = useToast();
  const [domain, setDomain] = useState(settings?.domain || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDomainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    setIsUpdating(true);
    try {
      // Clean the domain (remove protocol, trailing slash)
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
      await updateSettings({ domain: cleanDomain });
      
      toast({
        title: "Domain Configured",
        description: "Your domain has been set up successfully. You can now run SEO audits."
      });
    } catch (error) {
      toast({
        title: "Setup Failed",
        description: "Failed to configure your domain. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const setupSteps = [
    {
      title: "Configure Domain",
      description: "Set your website's primary domain",
      completed: !!settings?.domain,
      action: "domain"
    },
    {
      title: "Google Search Console",
      description: "Connect your GSC property for search data",
      completed: !!settings?.gsc_property,
      action: "gsc"
    },
    {
      title: "Google Analytics",
      description: "Link GA4 for traffic insights",
      completed: !!settings?.ga4_property,
      action: "ga4"
    }
  ];

  const completedSteps = setupSteps.filter(step => step.completed).length;
  const setupProgress = (completedSteps / setupSteps.length) * 100;

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Settings className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p>Loading SEO settings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (settings?.domain) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            SEO Setup Complete
          </CardTitle>
          <CardDescription>
            Your SEO monitoring is configured and ready
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Domain Configured</span>
              </div>
              <Badge variant="default">{settings.domain}</Badge>
            </div>
            
            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                Next steps: Connect Google Search Console and Analytics for comprehensive data.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          SEO Setup Required
        </CardTitle>
        <CardDescription>
          Configure your SEO monitoring to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="text-center">
            <div className="text-3xl font-bold text-muted-foreground mb-2">
              {completedSteps}/3
            </div>
            <p className="text-sm text-muted-foreground">Steps completed</p>
          </div>

          {/* Domain Configuration Form */}
          <form onSubmit={handleDomainSubmit} className="space-y-4">
            <div>
              <Label htmlFor="domain">Website Domain *</Label>
              <Input
                id="domain"
                type="text"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="mt-2"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter your domain without https:// (e.g., example.com)
              </p>
            </div>
            
            <Button type="submit" disabled={isUpdating || !domain.trim()}>
              {isUpdating ? "Configuring..." : "Configure Domain"}
            </Button>
          </form>

          {/* Setup Steps */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Setup Checklist</h3>
            {setupSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  step.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {step.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {step.completed && (
                  <Badge variant="default">Complete</Badge>
                )}
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <Alert>
            <ExternalLink className="h-4 w-4" />
            <AlertDescription>
              After configuring your domain, you'll be able to run technical SEO audits and monitor your site's health.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOSetup;