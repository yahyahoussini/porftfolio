import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Simulate technical SEO audit
    const auditResults = await runTechnicalAudit(url);
    
    // Store audit results in database
    const { data, error } = await supabaseClient
      .from('seo_audits')
      .insert({
        page_url: url,
        audit_data: auditResults.data,
        technical_score: auditResults.technical_score,
        content_score: auditResults.content_score,
        performance_score: auditResults.performance_score,
        overall_score: auditResults.overall_score,
        issues: auditResults.issues,
        recommendations: auditResults.recommendations
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save audit results' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Also check for crawl errors
    const crawlErrors = await checkCrawlErrors(url);
    if (crawlErrors.length > 0) {
      await supabaseClient
        .from('crawl_errors')
        .insert(crawlErrors);
    }

    return new Response(
      JSON.stringify({ success: true, audit: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('SEO audit error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function runTechnicalAudit(url: string) {
  // Simulate fetching the page (in production, you'd use a real crawler)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const baseScore = Math.floor(Math.random() * 30) + 70; // 70-100
  const issues = [];
  const recommendations = [];
  
  // Simulate common SEO issues
  const possibleIssues = [
    'Missing meta description',
    'Title tag too long (>60 characters)',
    'Multiple H1 tags found',
    'Images without alt text',
    'Missing robots.txt',
    'Broken internal links detected',
    'Page loading speed too slow',
    'Missing structured data'
  ];
  
  const possibleRecommendations = [
    'Add unique meta descriptions to all pages',
    'Optimize title tags for search engines',
    'Use only one H1 tag per page',
    'Add descriptive alt text to all images',
    'Create and configure robots.txt',
    'Fix broken internal links',
    'Optimize images and reduce page load time',
    'Implement structured data markup',
    'Improve mobile responsiveness',
    'Add canonical URLs to prevent duplicate content'
  ];
  
  // Randomly select issues and recommendations
  const numIssues = Math.floor(Math.random() * 4) + 1;
  const numRecommendations = Math.floor(Math.random() * 5) + 3;
  
  for (let i = 0; i < numIssues; i++) {
    const randomIssue = possibleIssues[Math.floor(Math.random() * possibleIssues.length)];
    if (!issues.includes(randomIssue)) {
      issues.push(randomIssue);
    }
  }
  
  for (let i = 0; i < numRecommendations; i++) {
    const randomRec = possibleRecommendations[Math.floor(Math.random() * possibleRecommendations.length)];
    if (!recommendations.includes(randomRec)) {
      recommendations.push(randomRec);
    }
  }
  
  return {
    data: {
      url,
      crawled_pages: Math.floor(Math.random() * 50) + 20,
      robots_txt_status: Math.random() > 0.3 ? 'valid' : 'missing',
      sitemap_status: Math.random() > 0.2 ? 'found' : 'missing',
      ssl_status: 'secure',
      mobile_friendly: Math.random() > 0.1,
      page_speed_score: Math.floor(Math.random() * 30) + 70,
      core_web_vitals: {
        lcp: (Math.random() * 2 + 1).toFixed(1) + 's',
        fid: Math.floor(Math.random() * 100) + 'ms',
        cls: (Math.random() * 0.2).toFixed(3)
      }
    },
    technical_score: Math.max(0, baseScore - issues.length * 5),
    content_score: Math.max(0, baseScore + Math.floor(Math.random() * 20) - 10),
    performance_score: Math.max(0, baseScore + Math.floor(Math.random() * 20) - 10),
    overall_score: Math.max(0, baseScore - issues.length * 3),
    issues,
    recommendations
  };
}

async function checkCrawlErrors(url: string) {
  const errors = [];
  
  // Simulate finding crawl errors
  const possibleErrors = [
    { type: '404', status: 404, message: 'Page not found' },
    { type: '500', status: 500, message: 'Internal server error' },
    { type: '403', status: 403, message: 'Access forbidden' },
    { type: 'timeout', status: 408, message: 'Request timeout' }
  ];
  
  // Randomly generate 0-3 errors
  const numErrors = Math.floor(Math.random() * 4);
  
  for (let i = 0; i < numErrors; i++) {
    const errorType = possibleErrors[Math.floor(Math.random() * possibleErrors.length)];
    const errorUrl = `${url}/page-${i + 1}`;
    
    errors.push({
      url: errorUrl,
      error_type: errorType.type,
      status_code: errorType.status,
      error_message: errorType.message,
      resolved: false
    });
  }
  
  return errors;
}