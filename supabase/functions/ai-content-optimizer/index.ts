import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContentOptimizationRequest {
  title: string;
  content: string;
  targetKeywords?: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { title, content, targetKeywords = [] }: ContentOptimizationRequest = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityApiKey) {
      console.error('Perplexity API key not found');
      return new Response(
        JSON.stringify({ error: 'AI optimization service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Optimize content for AI platforms
    const optimizedContent = await optimizeForAI(title, content, targetKeywords, perplexityApiKey);
    
    return new Response(
      JSON.stringify({ 
        optimizedContent: optimizedContent.content,
        optimizedTitle: optimizedContent.title,
        optimizedDescription: optimizedContent.description,
        improvements: optimizedContent.improvements,
        success: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Content optimization error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to optimize content' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function optimizeForAI(
  title: string, 
  content: string, 
  keywords: string[], 
  apiKey: string
) {
  try {
    const keywordsText = keywords.length > 0 ? keywords.join(', ') : 'general topics';
    
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
            content: `You are an expert in Generative Engine Optimization (GEO) and AI-friendly content creation. Optimize content for better visibility in AI search results across ChatGPT, Perplexity, Claude, Gemini, and Google SGE.

OPTIMIZATION RULES:
1. Make content easily quotable by AI systems
2. Add question-answer sections
3. Include clear, factual statements
4. Use conversational language
5. Add semantic keywords naturally
6. Structure for easy AI parsing
7. Include specific data and examples
8. Make content citation-worthy

Return the optimized content in the same format but enhanced for AI visibility.`
          },
          {
            role: 'user',
            content: `Optimize this blog post for maximum AI search visibility:

TITLE: ${title}
TARGET KEYWORDS: ${keywordsText}

CONTENT:
${content}

Please:
1. Enhance the content structure for AI citation
2. Add Q&A sections where appropriate  
3. Include conversational elements
4. Improve factual clarity
5. Suggest an optimized meta description

Keep the core message but make it more AI-friendly.`
          }
        ],
        temperature: 0.3,
        top_p: 0.9,
        max_tokens: 2000,
        return_images: false,
        return_related_questions: false,
        frequency_penalty: 0.5,
        presence_penalty: 0.3
      }),
    });

    if (!response.ok) {
      console.error('Perplexity API error:', response.status, response.statusText);
      return getBasicOptimization(title, content, keywords);
    }

    const data = await response.json();
    const optimizedResponse = data.choices?.[0]?.message?.content;
    
    if (optimizedResponse) {
      // Parse the AI response to extract different components
      const sections = optimizedResponse.split('\n\n');
      let optimizedContent = content;
      let optimizedTitle = title;
      let optimizedDescription = '';
      
      // Try to extract optimized content from AI response
      const contentMatch = optimizedResponse.match(/CONTENT:\s*([\s\S]*?)(?=META DESCRIPTION:|$)/i);
      if (contentMatch) {
        optimizedContent = contentMatch[1].trim();
      }
      
      // Try to extract meta description
      const descriptionMatch = optimizedResponse.match(/META DESCRIPTION:\s*(.+)/i);
      if (descriptionMatch) {
        optimizedDescription = descriptionMatch[1].trim();
      }
      
      return {
        content: optimizedContent,
        title: optimizedTitle,
        description: optimizedDescription,
        improvements: [
          'Enhanced content structure for AI citation',
          'Added conversational elements for better AI understanding',
          'Improved factual clarity and specific examples',
          'Optimized for voice search and AI platforms'
        ]
      };
    }

    return getBasicOptimization(title, content, keywords);
  } catch (error) {
    console.error('AI optimization failed:', error);
    return getBasicOptimization(title, content, keywords);
  }
}

function getBasicOptimization(title: string, content: string, keywords: string[]) {
  // Basic optimization without AI
  let optimizedContent = content;
  
  // Add Q&A section if not present
  if (!content.includes('?')) {
    optimizedContent += `\n\n## Frequently Asked Questions\n\n**What is the main topic of this article?**\nThis article covers ${title.toLowerCase()} and provides comprehensive insights on the subject.\n\n**Why is this important?**\nUnderstanding ${title.toLowerCase()} helps readers make informed decisions and gain valuable knowledge.`;
  }
  
  // Add conversational elements
  if (!content.includes('you')) {
    optimizedContent = optimizedContent.replace(/The reader/g, 'You');
    optimizedContent = optimizedContent.replace(/One can/g, 'You can');
  }
  
  // Generate basic meta description
  const optimizedDescription = `Learn about ${title.toLowerCase()}. ${content.substring(0, 100).replace(/[^\w\s]/g, '')}...`;
  
  return {
    content: optimizedContent,
    title: title,
    description: optimizedDescription.substring(0, 160),
    improvements: [
      'Added FAQ section for better AI citation',
      'Enhanced conversational tone',
      'Generated SEO-optimized meta description',
      'Improved content structure'
    ]
  };
}