import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  TrendingUp, 
  Search, 
  MessageSquare, 
  Globe, 
  Zap,
  RefreshCw,
  Quote,
  BarChart3,
  Target
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface GEOMetrics {
  platform: string;
  citations: number;
  mentions: number;
  shareOfVoice: number;
  visibility: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  queries: string[];
  lastUpdated: string;
}

const GEOTracker = () => {
  const [geoMetrics, setGeoMetrics] = useState<GEOMetrics[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastScan, setLastScan] = useState<Date | null>(null);

  const platforms = [
    { name: 'ChatGPT', icon: Bot, color: 'bg-green-500' },
    { name: 'Perplexity', icon: Search, color: 'bg-blue-500' },
    { name: 'Claude', icon: MessageSquare, color: 'bg-purple-500' },
    { name: 'Gemini', icon: Globe, color: 'bg-yellow-500' },
    { name: 'Google_SGE', icon: Zap, color: 'bg-red-500' },
  ];

  useEffect(() => {
    loadGEOMetrics();
  }, []);

  const loadGEOMetrics = async () => {
    // Simulate loading GEO metrics - in production, these would come from actual API monitoring
    const mockMetrics: GEOMetrics[] = [
      {
        platform: 'ChatGPT',
        citations: 45,
        mentions: 67,
        shareOfVoice: 23,
        visibility: 78,
        sentiment: 'positive',
        queries: ['portfolio development', 'web development skills', 'react projects'],
        lastUpdated: new Date().toISOString(),
      },
      {
        platform: 'Perplexity',
        citations: 32,
        mentions: 48,
        shareOfVoice: 18,
        visibility: 65,
        sentiment: 'positive',
        queries: ['developer portfolio', 'frontend development', 'javascript projects'],
        lastUpdated: new Date().toISOString(),
      },
      {
        platform: 'Claude',
        citations: 28,
        mentions: 35,
        shareOfVoice: 15,
        visibility: 52,
        sentiment: 'neutral',
        queries: ['web developer', 'portfolio examples', 'coding projects'],
        lastUpdated: new Date().toISOString(),
      },
      {
        platform: 'Gemini',
        citations: 22,
        mentions: 31,
        shareOfVoice: 12,
        visibility: 48,
        sentiment: 'positive',
        queries: ['software developer', 'portfolio showcase', 'tech skills'],
        lastUpdated: new Date().toISOString(),
      },
      {
        platform: 'Google_SGE',
        citations: 38,
        mentions: 54,
        shareOfVoice: 20,
        visibility: 72,
        sentiment: 'positive',
        queries: ['developer resume', 'portfolio website', 'coding experience'],
        lastUpdated: new Date().toISOString(),
      },
    ];

    setGeoMetrics(mockMetrics);
    setLastScan(new Date());
  };

  const runGEOScan = async () => {
    setLoading(true);
    try {
      // In production, this would trigger actual API scans across platforms
      const { data, error } = await supabase.functions.invoke('geo-scanner', {
        body: { domain: 'yourportfolio.com' }
      });

      if (data) {
        await loadGEOMetrics();
      }
    } catch (error) {
      console.error('GEO scan failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalCitations = geoMetrics.reduce((sum, metric) => sum + metric.citations, 0);
  const totalMentions = geoMetrics.reduce((sum, metric) => sum + metric.mentions, 0);
  const avgVisibility = geoMetrics.reduce((sum, metric) => sum + metric.visibility, 0) / geoMetrics.length;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'default';
      case 'negative': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-blue-600" />
            Generative Engine Optimization (GEO)
          </h2>
          <p className="text-muted-foreground">Track your visibility across AI platforms and search engines</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={runGEOScan} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Scan AI Platforms
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citations</CardTitle>
            <Quote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCitations}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Mentions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMentions}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Visibility</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgVisibility)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastScan ? lastScan.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
            </div>
            <p className="text-xs text-muted-foreground">
              {lastScan ? 'Recent scan' : 'No scan yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            AI Platform Performance
          </CardTitle>
          <CardDescription>
            Detailed breakdown of your visibility across major AI platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {geoMetrics.map((metric) => {
              const platform = platforms.find(p => p.name === metric.platform);
              const Icon = platform?.icon || Bot;
              
              return (
                <div key={metric.platform} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${platform?.color} text-white`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium">{metric.platform.replace('_', ' ')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {metric.citations} citations • {metric.mentions} mentions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{metric.visibility}%</div>
                      <Badge variant={getSentimentBadge(metric.sentiment)}>
                        {metric.sentiment}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-12">
                    <div>
                      <div className="text-sm font-medium mb-1">Visibility Score</div>
                      <Progress value={metric.visibility} className="h-2" />
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Share of Voice</div>
                      <Progress value={metric.shareOfVoice} className="h-2" />
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Citation Rate</div>
                      <Progress value={Math.min(100, (metric.citations / metric.mentions) * 100)} className="h-2" />
                    </div>
                  </div>

                  <div className="ml-12">
                    <div className="text-sm font-medium mb-2">Top Queries</div>
                    <div className="flex flex-wrap gap-2">
                      {metric.queries.slice(0, 3).map((query) => (
                        <Badge key={query} variant="outline" className="text-xs">
                          {query}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Trends and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Citation Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Week over week growth</span>
                <span className="text-green-600 font-medium">+12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Most cited content</span>
                <span className="text-sm font-medium">Portfolio Projects</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Best performing platform</span>
                <span className="text-sm font-medium">ChatGPT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. sentiment score</span>
                <span className="text-green-600 font-medium">Positive</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Optimization Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div>
                  <p className="text-sm font-medium">Improve Claude visibility</p>
                  <p className="text-xs text-muted-foreground">Add more technical depth to content</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                <div>
                  <p className="text-sm font-medium">Optimize for voice queries</p>
                  <p className="text-xs text-muted-foreground">Include more conversational keywords</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <div>
                  <p className="text-sm font-medium">Expand Gemini reach</p>
                  <p className="text-xs text-muted-foreground">Create more visual content with descriptions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GEOTracker;