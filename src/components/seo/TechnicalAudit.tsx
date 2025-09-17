import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Globe, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Play,
  Settings,
  RefreshCw
} from 'lucide-react';
import { useSEOSettings, useSEOAudits } from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';

const TechnicalAudit = () => {
  const { settings, updateSettings } = useSEOSettings();
  const { createAudit } = useSEOAudits();
  const { toast } = useToast();
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [robotsTxt, setRobotsTxt] = useState(settings?.robots_txt || '');
  const [sitemapUrl, setSitemapUrl] = useState(settings?.sitemap_url || '');

  const defaultRobotsTxt = `User-agent: *
Allow: /

Sitemap: ${settings?.domain ? `https://${settings.domain}/sitemap.xml` : 'https://yourdomain.com/sitemap.xml'}`;

  const runTechnicalAudit = async () => {
    if (!settings?.domain) {
      toast({
        title: "Domain Required",
        description: "Please configure your domain first to run an audit.",
        variant: "destructive"
      });
      return;
    }

    setIsRunningAudit(true);
    
    try {
      // Simulate technical audit - replace with real implementation
      const auditResults = await simulateTechnicalAudit(settings.domain);
      
      await createAudit({
        page_url: settings.domain,
        audit_data: auditResults.data,
        technical_score: auditResults.technical_score,
        content_score: auditResults.content_score,
        performance_score: auditResults.performance_score,
        overall_score: auditResults.overall_score,
        issues: auditResults.issues,
        recommendations: auditResults.recommendations
      });

      toast({
        title: "Audit Complete",
        description: "Technical SEO audit has been completed successfully."
      });
    } catch (error) {
      toast({
        title: "Audit Failed",
        description: "Failed to complete the technical audit. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRunningAudit(false);
    }
  };

  const saveRobotsTxt = async () => {
    try {
      await updateSettings({ robots_txt: robotsTxt });
      toast({
        title: "Robots.txt Updated",
        description: "Your robots.txt configuration has been saved."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update robots.txt. Please try again.",
        variant: "destructive"
      });
    }
  };

  const saveSitemap = async () => {
    try {
      await updateSettings({ sitemap_url: sitemapUrl });
      toast({
        title: "Sitemap Updated",
        description: "Your sitemap URL has been saved."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update sitemap URL. Please try again.",
        variant: "destructive"
      });
    }
  };

  const technicalChecks = [
    { name: 'Robots.txt', status: settings?.robots_txt ? 'configured' : 'missing', icon: FileText },
    { name: 'XML Sitemap', status: settings?.sitemap_url ? 'configured' : 'missing', icon: Globe },
    { name: 'Meta Robots', status: 'checking', icon: Search },
    { name: 'Canonical URLs', status: 'checking', icon: CheckCircle },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Technical SEO Audit
        </CardTitle>
        <CardDescription>
          Monitor and optimize technical SEO elements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="robots">Robots.txt</TabsTrigger>
            <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Technical Health Check</h3>
              <Button 
                onClick={runTechnicalAudit} 
                size="sm" 
                disabled={isRunningAudit}
              >
                {isRunningAudit ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                Run Audit
              </Button>
            </div>
            
            <div className="space-y-2">
              {technicalChecks.map((check) => {
                const Icon = check.icon;
                return (
                  <div key={check.name} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{check.name}</span>
                    </div>
                    <Badge 
                      variant={
                        check.status === 'configured' ? 'default' : 
                        check.status === 'missing' ? 'destructive' : 'secondary'
                      }
                    >
                      {check.status === 'configured' ? 'OK' : 
                       check.status === 'missing' ? 'Missing' : 'Checking'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="robots" className="space-y-4">
            <div>
              <Label htmlFor="robots">Robots.txt Content</Label>
              <Textarea
                id="robots"
                placeholder={defaultRobotsTxt}
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                className="mt-2 h-32"
              />
            </div>
            <Button onClick={saveRobotsTxt} size="sm">
              Save Robots.txt
            </Button>
          </TabsContent>
          
          <TabsContent value="sitemap" className="space-y-4">
            <div>
              <Label htmlFor="sitemap">XML Sitemap URL</Label>
              <Input
                id="sitemap"
                type="url"
                placeholder="https://yourdomain.com/sitemap.xml"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button onClick={saveSitemap} size="sm">
              Save Sitemap URL
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Simulate technical audit - replace with real implementation
const simulateTechnicalAudit = async (domain: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const baseScore = Math.floor(Math.random() * 30) + 70; // 70-100
  
  return {
    data: {
      domain,
      crawled_pages: Math.floor(Math.random() * 50) + 20,
      robots_txt_status: 'valid',
      sitemap_status: 'found',
      ssl_status: 'secure',
      mobile_friendly: true
    },
    technical_score: baseScore,
    content_score: Math.max(0, baseScore + Math.floor(Math.random() * 20) - 10),
    performance_score: Math.max(0, baseScore + Math.floor(Math.random() * 20) - 10),
    overall_score: baseScore,
    issues: [
      'Missing meta description on some pages',
      'Some images lack alt text',
      'H1 tag missing on 2 pages'
    ].slice(0, Math.floor(Math.random() * 3) + 1),
    recommendations: [
      'Add meta descriptions to all pages',
      'Optimize images with descriptive alt text',
      'Ensure each page has a unique H1 tag',
      'Improve page loading speed'
    ].slice(0, Math.floor(Math.random() * 4) + 1)
  };
};

export default TechnicalAudit;