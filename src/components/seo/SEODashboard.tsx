import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Globe, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  FileText,
  Settings
} from 'lucide-react';
import { useSEOAudits, useCrawlErrors, useSEOSettings } from '@/hooks/useSEO';
import TechnicalAudit from './TechnicalAudit';
import CrawlErrorsWidget from './CrawlErrorsWidget';

const SEODashboard = () => {
  const { audits, loading: auditsLoading } = useSEOAudits(5);
  const { errors, loading: errorsLoading } = useCrawlErrors(10);
  const { settings } = useSEOSettings();

  const latestAudit = audits[0];
  const unresolvedErrors = errors.filter(error => !error.resolved);
  
  const seoMetrics = {
    overallScore: latestAudit?.overall_score || 0,
    technicalScore: latestAudit?.technical_score || 0,
    contentScore: latestAudit?.content_score || 0,
    performanceScore: latestAudit?.performance_score || 0,
    criticalIssues: unresolvedErrors.filter(e => e.status_code >= 500).length,
    totalIssues: unresolvedErrors.length
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Work';
    return 'Critical';
  };

  return (
    <div className="space-y-6">
      {/* SEO Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall SEO Score</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={getScoreColor(seoMetrics.overallScore)}>
                {seoMetrics.overallScore}/100
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {getScoreStatus(seoMetrics.overallScore)}
            </p>
            <Progress value={seoMetrics.overallScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technical Health</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={getScoreColor(seoMetrics.technicalScore)}>
                {seoMetrics.technicalScore}/100
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Technical SEO Status
            </p>
            <Progress value={seoMetrics.technicalScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {seoMetrics.criticalIssues}
            </div>
            <p className="text-xs text-muted-foreground">
              {seoMetrics.totalIssues} total issues
            </p>
            <div className="flex gap-1 mt-2">
              <Badge variant={seoMetrics.criticalIssues === 0 ? "default" : "destructive"}>
                {seoMetrics.criticalIssues === 0 ? "Healthy" : "Needs Attention"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Domain Status</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {settings?.domain ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <Settings className="h-6 w-6 text-yellow-600" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {settings?.domain || 'Setup Required'}
            </p>
            <Badge variant={settings?.domain ? "default" : "secondary"} className="mt-2">
              {settings?.domain ? "Configured" : "Setup Needed"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* SEO Health Status */}
      {!settings?.domain && (
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertDescription>
            Complete your SEO setup by configuring your domain and connecting Google Search Console & Analytics.
          </AlertDescription>
        </Alert>
      )}

      {/* Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Content Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{seoMetrics.contentScore}/100</span>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <Progress value={seoMetrics.contentScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Meta tags, headers, content structure
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{seoMetrics.performanceScore}/100</span>
              <Zap className="h-5 w-5 text-muted-foreground" />
            </div>
            <Progress value={seoMetrics.performanceScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Core Web Vitals, page speed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Technical SEO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{seoMetrics.technicalScore}/100</span>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <Progress value={seoMetrics.technicalScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Robots.txt, sitemap, crawlability
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Technical Audit and Crawl Errors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TechnicalAudit />
        <CrawlErrorsWidget />
      </div>
    </div>
  );
};

export default SEODashboard;