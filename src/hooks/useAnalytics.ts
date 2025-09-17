import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsVisitor {
  id: string;
  session_id: string;
  user_agent?: string;
  ip_address?: string;
  referrer?: string;
  landing_page?: string;
  exit_page?: string;
  country?: string;
  city?: string;
  device_type?: string;
  browser?: string;
  session_duration: number;
  page_views: number;
  created_at: string;
}

export interface AnalyticsEvent {
  id: string;
  session_id: string;
  event_type: string;
  event_data?: any;
  page_url?: string;
  timestamp: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  source: string;
  lead_score: number;
  status: string;
  created_at: string;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  totalPageViews: number;
  uniqueSessions: number;
  avgSessionDuration: number;
  contactSubmissions: number;
  cvDownloads: number;
  projectClicks: number;
  conversionRate: number;
}

export const useAnalyticsSummary = (dateRange: { from: Date; to: Date }) => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const fromDate = dateRange.from.toISOString();
        const toDate = dateRange.to.toISOString();

        // Fetch visitor metrics
        const { data: visitors, error: visitorsError } = await supabase
          .from('analytics_visitors')
          .select('*')
          .gte('created_at', fromDate)
          .lte('created_at', toDate);

        if (visitorsError) throw visitorsError;

        // Fetch contact submissions
        const { data: contacts, error: contactsError } = await supabase
          .from('contact_submissions')
          .select('*')
          .gte('created_at', fromDate)
          .lte('created_at', toDate);

        if (contactsError) throw contactsError;

        // Fetch events for CV downloads and project clicks
        const { data: events, error: eventsError } = await supabase
          .from('analytics_events')
          .select('*')
          .gte('timestamp', fromDate)
          .lte('timestamp', toDate)
          .in('event_type', ['cv_download', 'project_click', 'demo_click']);

        if (eventsError) throw eventsError;

        const totalVisitors = visitors?.length || 0;
        const totalPageViews = visitors?.reduce((sum, v) => sum + v.page_views, 0) || 0;
        const uniqueSessions = new Set(visitors?.map(v => v.session_id)).size;
        const avgSessionDuration = totalVisitors > 0 
          ? (visitors?.reduce((sum, v) => sum + v.session_duration, 0) || 0) / totalVisitors 
          : 0;
        
        const contactSubmissions = contacts?.length || 0;
        const cvDownloads = events?.filter(e => e.event_type === 'cv_download').length || 0;
        const projectClicks = events?.filter(e => ['project_click', 'demo_click'].includes(e.event_type)).length || 0;
        const conversionRate = totalVisitors > 0 ? (contactSubmissions / totalVisitors) * 100 : 0;

        setSummary({
          totalVisitors,
          totalPageViews,
          uniqueSessions,
          avgSessionDuration,
          contactSubmissions,
          cvDownloads,
          projectClicks,
          conversionRate
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [dateRange]);

  return { summary, loading, error };
};

export const useAnalyticsVisitors = (limit: number = 100) => {
  const [visitors, setVisitors] = useState<AnalyticsVisitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const { data, error } = await supabase
          .from('analytics_visitors')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) throw error;
        setVisitors(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, [limit]);

  return { visitors, loading, error };
};

export const useContactSubmissions = (limit: number = 50) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) throw error;
        setSubmissions(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [limit]);

  return { submissions, loading, error };
};