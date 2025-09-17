import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Bot, Eye, Globe, Search, Sparkles, Target, Zap } from 'lucide-react';
import { BlogPostDraft, AIOptimizationScore } from '@/hooks/useBlogAdmin';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BlogEditorProps {
  post?: BlogPostDraft;
  onSave: (post: BlogPostDraft) => Promise<void>;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onSave, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BlogPostDraft>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: 'Portfolio Owner',
    published: false,
    featured_image: '',
    category: '',
    tags: [],
    meta_title: '',
    meta_description: '',
    language: 'en',
    ...post,
  });

  const [aiScore, setAiScore] = useState<AIOptimizationScore>({
    overall: 0,
    geo: 0,
    seo: 0,
    readability: 0,
    aiDetection: 0,
    voiceSearch: 0,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    if (formData.content) {
      analyzeContent();
    }
  }, [formData.content, formData.title]);

  const analyzeContent = async () => {
    if (!formData.content || formData.content.length < 100) return;
    
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-content-analyzer', {
        body: {
          title: formData.title,
          content: formData.content,
          metaDescription: formData.meta_description,
        },
      });

      if (error) throw error;
      if (data?.scores) {
        setAiScore(data.scores);
      }
      if (data?.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('AI analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      await onSave(formData);
      toast({
        title: "Success",
        description: post ? "Post updated successfully." : "Post created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const optimizeForAI = async () => {
    if (!formData.content) return;
    
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-content-optimizer', {
        body: {
          title: formData.title,
          content: formData.content,
          targetKeywords: formData.tags,
        },
      });

      if (error) throw error;
      
      if (data?.optimizedContent) {
        setFormData(prev => ({
          ...prev,
          content: data.optimizedContent,
          meta_title: data.optimizedTitle || prev.meta_title,
          meta_description: data.optimizedDescription || prev.meta_description,
        }));
        
        toast({
          title: "AI Optimization Complete",
          description: "Your content has been optimized for AI platforms and search engines.",
        });
      }
    } catch (error) {
      toast({
        title: "Optimization Failed",
        description: "Failed to optimize content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {post ? 'Edit Blog Post' : 'Create New Blog Post'}
                <Bot className="h-5 w-5 text-blue-600" />
              </CardTitle>
              <CardDescription>
                AI-powered blog editor with advanced SEO and GEO optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter your blog post title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description of your post"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your blog post content here..."
                      rows={15}
                      required
                    />
                  </div>
                </div>

                {/* SEO Section */}
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    SEO & Meta Information
                  </h3>
                  
                  <div>
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                      id="meta_title"
                      value={formData.meta_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                      placeholder="SEO title (60 characters max)"
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.meta_title?.length || 0}/60 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                      id="meta_description"
                      value={formData.meta_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                      placeholder="SEO description (160 characters max)"
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.meta_description?.length || 0}/160 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="Blog category"
                    />
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" variant="outline" onClick={addTag}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Publishing Options */}
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button type="submit" disabled={isAnalyzing}>
                    {post ? 'Update Post' : 'Create Post'}
                  </Button>
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={optimizeForAI}
                    disabled={isAnalyzing || !formData.content}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Optimize
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* AI Optimization Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                AI Optimization Score
              </CardTitle>
              <CardDescription>
                Real-time analysis for AI platforms and SEO
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isAnalyzing ? (
                <div className="text-center py-4">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Analyzing content...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Score</span>
                      <span className={`text-lg font-bold ${getScoreColor(aiScore.overall)}`}>
                        {aiScore.overall}/100
                      </span>
                    </div>
                    <Progress value={aiScore.overall} className="h-2" />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    {[
                      { label: 'GEO Optimization', value: aiScore.geo, icon: Globe },
                      { label: 'SEO Score', value: aiScore.seo, icon: Search },
                      { label: 'Readability', value: aiScore.readability, icon: Eye },
                      { label: 'AI Detection', value: aiScore.aiDetection, icon: Bot },
                      { label: 'Voice Search', value: aiScore.voiceSearch, icon: Target },
                    ].map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <div key={metric.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{metric.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={metric.value} className="w-16 h-2" />
                            <span className={`text-sm font-medium ${getScoreColor(metric.value)}`}>
                              {metric.value}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {isAnalyzing ? (
                  <div className="text-center py-4">
                    <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Getting AI recommendations...</p>
                  </div>
                ) : (
                  <>
                    {recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{recommendation}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;