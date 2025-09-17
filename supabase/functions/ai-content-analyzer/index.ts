import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContentAnalysisRequest {
  title: string;
  content: string;
  metaDescription?: string;
}

interface AIOptimizationScore {
  overall: number;
  geo: number;
  seo: number;
  readability: number;
  aiDetection: number;
  voiceSearch: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { title, content, metaDescription }: ContentAnalysisRequest = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Analyze content using Perplexity API for AI optimization insights
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityApiKey) {
      console.error('Perplexity API key not found');
      return new Response(
        JSON.stringify({ error: 'AI analysis service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate analysis scores
    const scores = await analyzeContent(title, content, metaDescription, perplexityApiKey);
    
    // Get GEO recommendations using AI
    const recommendations = await getGEORecommendations(title, content, perplexityApiKey);

    return new Response(
      JSON.stringify({ 
        scores, 
        recommendations,
        success: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Content analysis error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to analyze content' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function analyzeContent(
  title: string, 
  content: string, 
  metaDescription?: string,
  apiKey?: string
): Promise<AIOptimizationScore> {
  const wordCount = content.split(/\s+/).length;
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = wordCount / sentences.length;
  
  // Basic SEO score calculation
  const hasTitleInContent = content.toLowerCase().includes(title.toLowerCase());
  const hasMetaDescription = !!metaDescription && metaDescription.length > 0;
  const hasProperLength = wordCount >= 300 && wordCount <= 2000;
  const hasGoodReadability = avgWordsPerSentence >= 10 && avgWordsPerSentence <= 20;
  
  // AI-specific optimizations
  const hasQuestionFormat = /\?/.test(content);
  const hasListFormat = /(\d+\.|•|-)/.test(content);
  const hasConversationalTone = /you|your|we|our/i.test(content);
  
  // Calculate scores
  const seoScore = Math.min(100, 
    (hasTitleInContent ? 25 : 0) +
    (hasMetaDescription ? 20 : 0) +
    (hasProperLength ? 25 : 0) +
    (hasGoodReadability ? 30 : 0)
  );

  const geoScore = Math.min(100,
    (hasQuestionFormat ? 30 : 0) +
    (hasListFormat ? 25 : 0) +
    (hasConversationalTone ? 25 : 0) +
    (wordCount > 500 ? 20 : 10)
  );

  const readabilityScore = Math.min(100,
    (hasGoodReadability ? 40 : 20) +
    (sentences.length > 5 ? 30 : 15) +
    (wordCount > 200 ? 30 : 15)
  );

  // Simulate AI detection score (lower is better for avoiding detection)
  const aiDetectionScore = Math.min(100, Math.max(10,
    100 - (hasConversationalTone ? 30 : 0) -
    (sentences.length > 10 ? 20 : 0) -
    (avgWordsPerSentence > 15 ? 10 : 0) -
    (hasQuestionFormat ? 20 : 0) -
    (Math.random() * 20) // Add some randomness
  ));

  const voiceSearchScore = Math.min(100,
    (hasConversationalTone ? 35 : 0) +
    (hasQuestionFormat ? 35 : 0) +
    (title.includes('how') || title.includes('what') || title.includes('why') ? 30 : 0)
  );

  const overall = Math.round((seoScore + geoScore + readabilityScore + (100 - aiDetectionScore) + voiceSearchScore) / 5);

  return {
    overall,
    geo: Math.round(geoScore),
    seo: Math.round(seoScore),
    readability: Math.round(readabilityScore),
    aiDetection: Math.round(aiDetectionScore),
    voiceSearch: Math.round(voiceSearchScore),
  };
}

async function getGEORecommendations(title: string, content: string, apiKey: string): Promise<string[]> {
  try {
    console.log('Making Perplexity API request for GEO recommendations...');
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in Generative Engine Optimization (GEO). Analyze content and provide 3-5 specific, actionable recommendations to improve visibility in AI search results. Format as numbered list.'
          },
          {
            role: 'user',
            content: `Title: ${title}\n\nContent: ${content.substring(0, 1000)}\n\nProvide GEO optimization recommendations:`
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 300,
        return_images: false,
        return_related_questions: false,
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    console.log('Perplexity API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, response.statusText, errorText);
      return getDefaultRecommendations();
    }

    const data = await response.json();
    console.log('Perplexity API response data:', JSON.stringify(data, null, 2));
    
    const recommendations = data.choices?.[0]?.message?.content;
    
    if (recommendations) {
      // Parse recommendations from AI response
      const parsed = recommendations
        .split('\n')
        .filter((line: string) => line.trim().length > 0 && (line.includes('-') || line.includes('•') || line.match(/^\d+\./)))
        .map((line: string) => line.replace(/^[-•\d.]\s*/, '').trim())
        .slice(0, 5);
      
      console.log('Parsed recommendations:', parsed);
      return parsed.length > 0 ? parsed : getDefaultRecommendations();
    }

    return getDefaultRecommendations();
  } catch (error) {
    console.error('Failed to get GEO recommendations:', error);
    return getDefaultRecommendations();
  }
}

function getDefaultRecommendations(): string[] {
  return [
    'Add more question-and-answer sections to improve AI citation chances',
    'Include conversational keywords that people use in voice search',
    'Create clear, factual statements that AI can easily extract and cite',
    'Add specific data points and statistics that AI platforms prefer',
    'Structure content with clear headings and bullet points for better AI parsing'
  ];
}