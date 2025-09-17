-- Create SEO settings table
CREATE TABLE public.seo_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  domain TEXT NOT NULL,
  gsc_property TEXT,
  ga4_property TEXT,
  robots_txt TEXT,
  sitemap_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create SEO audits table
CREATE TABLE public.seo_audits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url TEXT NOT NULL,
  audit_data JSONB NOT NULL DEFAULT '{}',
  technical_score INTEGER DEFAULT 0,
  content_score INTEGER DEFAULT 0,
  performance_score INTEGER DEFAULT 0,
  overall_score INTEGER DEFAULT 0,
  issues JSONB DEFAULT '[]',
  recommendations JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create crawl errors table
CREATE TABLE public.crawl_errors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  error_type TEXT NOT NULL,
  status_code INTEGER,
  error_message TEXT,
  discovered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved BOOLEAN DEFAULT false
);

-- Create keywords table for future use
CREATE TABLE public.keywords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  target_url TEXT NOT NULL,
  current_position INTEGER,
  previous_position INTEGER,
  search_volume INTEGER DEFAULT 0,
  difficulty INTEGER DEFAULT 0,
  last_checked TIMESTAMP WITH TIME ZONE,
  trend TEXT DEFAULT 'stable',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crawl_errors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keywords ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access only
CREATE POLICY "Admin can manage SEO settings" ON public.seo_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Admin can view SEO audits" ON public.seo_audits FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Admin can manage SEO audits" ON public.seo_audits FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Admin can view crawl errors" ON public.crawl_errors FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Admin can manage crawl errors" ON public.crawl_errors FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Admin can manage keywords" ON public.keywords FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid())
);

-- Create indexes for performance
CREATE INDEX idx_seo_audits_page_url ON public.seo_audits(page_url);
CREATE INDEX idx_seo_audits_created_at ON public.seo_audits(created_at DESC);
CREATE INDEX idx_crawl_errors_url ON public.crawl_errors(url);
CREATE INDEX idx_crawl_errors_resolved ON public.crawl_errors(resolved);
CREATE INDEX idx_keywords_keyword ON public.keywords(keyword);
CREATE INDEX idx_keywords_target_url ON public.keywords(target_url);

-- Create trigger for updating updated_at on seo_settings
CREATE TRIGGER update_seo_settings_updated_at
  BEFORE UPDATE ON public.seo_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();