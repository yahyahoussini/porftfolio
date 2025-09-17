import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SEOSettings {
  id: string;
  domain: string;
  gsc_property?: string;
  ga4_property?: string;
  robots_txt?: string;
  sitemap_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SEOAudit {
  id: string;
  page_url: string;
  audit_data: any;
  technical_score: number;
  content_score: number;
  performance_score: number;
  overall_score: number;
  issues: any[];
  recommendations: any[];
  created_at: string;
}

export interface CrawlError {
  id: string;
  url: string;
  error_type: string;
  status_code?: number;
  error_message?: string;
  discovered_at: string;
  resolved: boolean;
}

export const useSEOSettings = () => {
  const [settings, setSettings] = useState<SEOSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('seo_settings')
          .select('*')
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        setSettings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (updates: Partial<Omit<SEOSettings, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      if (settings) {
        const { data, error } = await supabase
          .from('seo_settings')
          .update(updates)
          .eq('id', settings.id)
          .select()
          .single();

        if (error) throw error;
        setSettings(data as SEOSettings);
      } else {
        // Ensure domain is provided for new settings
        if (!updates.domain) {
          throw new Error('Domain is required for new SEO settings');
        }
        const { data, error } = await supabase
          .from('seo_settings')
          .insert(updates as any)
          .select()
          .single();

        if (error) throw error;
        setSettings(data as SEOSettings);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
    }
  };

  return { settings, loading, error, updateSettings };
};

export const useSEOAudits = (limit?: number) => {
  const [audits, setAudits] = useState<SEOAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        let query = supabase
          .from('seo_audits')
          .select('*')
          .order('created_at', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        setAudits((data || []).map(audit => ({
          ...audit,
          issues: Array.isArray(audit.issues) ? audit.issues : [],
          recommendations: Array.isArray(audit.recommendations) ? audit.recommendations : []
        })) as SEOAudit[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAudits();
  }, [limit]);

  const createAudit = async (auditData: Omit<SEOAudit, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('seo_audits')
        .insert(auditData)
        .select()
        .single();

      if (error) throw error;
      const formattedData = {
        ...data,
        issues: Array.isArray(data.issues) ? data.issues : [],
        recommendations: Array.isArray(data.recommendations) ? data.recommendations : []
      } as SEOAudit;
      setAudits(prev => [formattedData, ...prev]);
      return formattedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create audit');
      return null;
    }
  };

  return { audits, loading, error, createAudit };
};

export const useCrawlErrors = (limit?: number) => {
  const [errors, setErrors] = useState<CrawlError[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchErrors = async () => {
      try {
        let query = supabase
          .from('crawl_errors')
          .select('*')
          .order('discovered_at', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        setErrors(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchErrors();
  }, [limit]);

  const resolveError = async (errorId: string) => {
    try {
      const { error } = await supabase
        .from('crawl_errors')
        .update({ resolved: true })
        .eq('id', errorId);

      if (error) throw error;
      setErrors(prev => prev.map(err => 
        err.id === errorId ? { ...err, resolved: true } : err
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resolve error');
    }
  };

  return { errors, loading, error, resolveError };
};