-- Blog Posts Table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL DEFAULT 'Portfolio Owner',
  published BOOLEAN NOT NULL DEFAULT false,
  featured_image TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  reading_time INTEGER,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Blog Categories Table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Analytics Visitors Table
CREATE TABLE public.analytics_visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  landing_page TEXT,
  exit_page TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  session_duration INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Analytics Events Table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  page_url TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact Form Submissions Table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'contact_form',
  lead_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for published blog posts
CREATE POLICY "Published blog posts are viewable by everyone" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Public read access for categories
CREATE POLICY "Categories are viewable by everyone" 
ON public.blog_categories 
FOR SELECT 
USING (true);

-- Analytics can be inserted by anyone (for tracking)
CREATE POLICY "Analytics data can be inserted by anyone" 
ON public.analytics_visitors 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Analytics events can be inserted by anyone" 
ON public.analytics_events 
FOR INSERT 
WITH CHECK (true);

-- Contact forms can be inserted by anyone
CREATE POLICY "Contact forms can be inserted by anyone" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Admin access policies (will need authentication later)
CREATE POLICY "Admin can manage blog posts" 
ON public.blog_posts 
FOR ALL 
USING (false); -- Will update when auth is added

CREATE POLICY "Admin can view analytics" 
ON public.analytics_visitors 
FOR SELECT 
USING (false); -- Will update when auth is added

-- Create update trigger for blog posts
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample blog categories
INSERT INTO public.blog_categories (name, slug, description, language) VALUES
('Full-Stack Development', 'full-stack-development', 'Technical tutorials, best practices, code examples', 'en'),
('AI & Machine Learning', 'ai-machine-learning', 'Prompt engineering guides, AI implementation tips', 'en'),
('Business Intelligence', 'business-intelligence', 'Data analytics insights, dashboard design, BI methodologies', 'en'),
('Startup Journey', 'startup-journey', 'Entrepreneurship lessons, competition experiences, business insights', 'en'),
('Client Success Stories', 'client-success-stories', 'Case studies, project breakdowns, results achieved', 'en'),
('Industry Trends', 'industry-trends', 'Tech market analysis, emerging technologies, career advice', 'en'),
-- French categories
('Développement Full-Stack', 'developpement-full-stack', 'Tutoriels techniques, meilleures pratiques, exemples de code', 'fr'),
('IA et Apprentissage Automatique', 'ia-apprentissage-automatique', 'Guides d''ingénierie de prompts, conseils d''implémentation IA', 'fr'),
('Intelligence d''Affaires', 'intelligence-affaires', 'Insights d''analyse de données, conception de tableaux de bord, méthodologies BI', 'fr'),
('Parcours Startup', 'parcours-startup', 'Leçons d''entrepreneuriat, expériences de concours, insights business', 'fr'),
('Histoires de Succès Client', 'histoires-succes-client', 'Études de cas, analyses de projets, résultats obtenus', 'fr'),
('Tendances Industrielles', 'tendances-industrielles', 'Analyse du marché tech, technologies émergentes, conseils de carrière', 'fr');

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, content, excerpt, category, tags, published, language, reading_time, meta_title, meta_description) VALUES
('Building Production-Ready Hydroponic AI Systems: Lessons from 50+ Users', 'building-production-hydroponic-ai-systems', 
'# Building Production-Ready Hydroponic AI Systems: Lessons from 50+ Users

After building and deploying HydroAI to over 50 commercial hydroponic farms, I''ve learned invaluable lessons about creating AI systems that work in real-world production environments...

## The Challenge

When I first started developing HydroAI, I thought the biggest challenge would be the AI algorithms. I was wrong. The real challenge was building a system robust enough for commercial use...

## Key Learnings

### 1. Data Quality is Everything
The most sophisticated AI model is useless with poor data quality...

### 2. Edge Computing is Essential
With farms in remote locations, internet connectivity can be unreliable...

### 3. User Experience Trumps Technical Complexity
Farmers don''t care about your neural network architecture...

## Technical Implementation

```python
# Example of our sensor data processing pipeline
class SensorDataProcessor:
    def __init__(self):
        self.quality_threshold = 0.95
        
    def process_reading(self, sensor_data):
        # Data validation and cleaning
        if self.validate_reading(sensor_data):
            return self.normalize_data(sensor_data)
        return None
```

## Results and Impact

- 40% increase in crop yield
- 30% reduction in resource waste
- 50+ active commercial users
- Competition winner recognition

## Conclusion

Building production AI systems taught me that success isn''t just about the algorithm...',
'Real-world lessons from deploying AI to 50+ commercial hydroponic farms. Learn about the challenges, solutions, and impact of production AI systems.',
'AI & Machine Learning', 
ARRAY['AI', 'Hydroponics', 'Production', 'IoT', 'Agriculture'],
true, 'en', 8,
'Building Production-Ready Hydroponic AI Systems | Developer Portfolio',
'Lessons from deploying AI to 50+ hydroponic farms. Learn about production AI challenges, solutions, and real-world impact.'),

('Prompt Engineering for Business Applications: Beyond ChatGPT', 'prompt-engineering-business-applications',
'# Prompt Engineering for Business Applications: Beyond ChatGPT

Most developers stop at basic ChatGPT interactions, but enterprise prompt engineering requires a completely different approach...

## The Enterprise Challenge

Business applications need:
- Consistent outputs
- Domain-specific knowledge
- Compliance requirements
- Cost optimization
- Integration capabilities

## Advanced Techniques

### 1. Chain-of-Thought Prompting for Complex Decisions

```javascript
const businessDecisionPrompt = `
Given the following business context: {context}
Follow this decision process:
1. Analyze the key factors
2. Consider potential risks
3. Evaluate alternatives
4. Recommend the best approach
5. Justify your reasoning

Context: {userInput}
Decision:
`;
```

### 2. Few-Shot Learning for Domain Expertise

Training the model with industry-specific examples...

## Real-World Implementation

I''ve implemented these techniques in:
- BrandAI platform for marketing decision-making
- E-commerce analytics for product recommendations
- Client consultation tools for strategic planning

## Measuring Success

Key metrics for business prompt engineering:
- Output consistency (>95% reliability)
- Response relevance scores
- User satisfaction ratings
- Cost per interaction

## Best Practices

1. **Version Control Your Prompts**
2. **A/B Test Different Approaches**
3. **Monitor for Prompt Injection**
4. **Implement Fallback Strategies**

## Conclusion

Enterprise prompt engineering is an art and science that goes far beyond simple queries...',
'Advanced prompt engineering techniques for business applications. Learn how to build reliable, consistent AI systems for enterprise use.',
'AI & Machine Learning',
ARRAY['Prompt Engineering', 'AI', 'Business', 'Enterprise', 'ChatGPT'],
true, 'en', 10,
'Prompt Engineering for Business Applications | AI Developer',
'Master advanced prompt engineering for enterprise AI applications. Learn techniques beyond basic ChatGPT usage.'),

('Google BI/DA Certification: What I Learned and How It Changed My Approach', 'google-bi-da-certification-insights',
'# Google BI/DA Certification: What I Learned and How It Changed My Approach

Completing both Google Business Intelligence and Data Analytics certifications transformed how I approach data-driven development...

## Why I Pursued These Certifications

As a developer building data-heavy applications, I realized I needed formal BI training...

## Key Learnings from the BI Certification

### 1. Data Modeling Best Practices
- Star vs. Snowflake schemas
- Dimensional modeling principles
- Data warehouse design patterns

### 2. Dashboard Design Psychology
- How users actually consume data
- The importance of progressive disclosure
- Color psychology in data visualization

### 3. Stakeholder Communication
- Translating technical insights to business value
- Creating compelling data narratives
- Managing expectations around data quality

## Data Analytics Certification Insights

### Statistical Foundations
- Understanding confidence intervals
- Avoiding correlation vs. causation traps
- Proper A/B testing methodology

### Tool Mastery
- Advanced SQL for complex analyses
- Tableau/Looker Studio best practices
- Python for data science workflows

## How It Changed My Development

### Before Certification:
- Built dashboards based on technical convenience
- Focused on functionality over usability
- Limited understanding of user needs

### After Certification:
- User-centered dashboard design
- Data storytelling in applications
- Proper metrics and KPI selection

## Real Project Applications

### HydroAI Analytics
Applied BI principles to create farmer-friendly dashboards...

### E-commerce Analytics Platform
Implemented proper funnel analysis and cohort tracking...

## ROI of the Investment

Time invested: 6 months
Career impact: Immediate improvement in client projects
New opportunities: BI consulting requests

## For Fellow Developers

If you''re building data applications, formal BI/DA training is invaluable...',
'How Google BI/DA certifications transformed my approach to data-driven development. Key insights and practical applications.',
'Business Intelligence',
ARRAY['Google Certification', 'Business Intelligence', 'Data Analytics', 'Career Development'],
true, 'en', 7,
'Google BI/DA Certification Insights | Data-Driven Developer',
'How Google Business Intelligence and Data Analytics certifications changed my development approach. Key learnings and applications.'),

('From Idea to Competition Winner: My Startup Development Process', 'idea-to-competition-winner-process',
'# From Idea to Competition Winner: My Startup Development Process

Winning multiple startup competitions taught me a systematic approach to turning ideas into viable products...

## The Initial Spark

HydroAI started as a simple observation: traditional farming was becoming unsustainable...

## Phase 1: Validation (Weeks 1-2)

### Market Research
- Interviewed 30+ potential users
- Analyzed competitor solutions
- Identified key pain points

### Technical Feasibility
- Prototyped core AI algorithms
- Tested hardware integration
- Estimated development timeline

## Phase 2: MVP Development (Weeks 3-8)

### Core Features First
- Sensor data collection
- Basic AI predictions
- Simple dashboard interface

### Technology Stack Decisions
```javascript
const techStack = {
  backend: "Node.js + Express",
  database: "PostgreSQL + TimescaleDB",
  ai: "Python + TensorFlow",
  frontend: "React + TypeScript",
  iot: "Arduino + ESP32"
};
```

## Phase 3: User Testing (Weeks 9-10)

### Early Adopter Feedback
- 5 pilot farms
- Weekly feedback sessions
- Rapid iteration cycles

### Key Pivots Made
- Simplified the interface
- Added mobile-first design
- Focused on alerts over analytics

## Phase 4: Competition Preparation (Weeks 11-12)

### Pitch Development
- Problem-solution fit narrative
- Market size and opportunity
- Traction and user testimonials
- Financial projections

### Demo Optimization
- 3-minute live demonstration
- Real-time data integration
- Compelling visual storytelling

## Competition Day Strategy

### What Worked
- Real user testimonials video
- Live data from actual farms
- Clear ROI calculations
- Passionate delivery

### What I''d Do Differently
- More focus on scalability
- Clearer monetization strategy
- Better team introduction

## Post-Competition Growth

Winning opened doors to:
- 50+ new users within 3 months
- Investment discussions
- Partnership opportunities
- Media coverage

## Lessons for Aspiring Entrepreneurs

1. **Start with the problem, not the technology**
2. **Get real users as early as possible**
3. **Focus on one thing and do it well**
4. **Practice your pitch constantly**
5. **Build for the judges'' time constraints**

## The Developer Advantage

Technical founders have unique advantages:
- Can build and iterate quickly
- Understand technical feasibility
- Can demonstrate live products
- Lower initial capital requirements

## What''s Next

Currently scaling HydroAI while exploring new opportunities in AI-powered agriculture...',
'The systematic process I used to develop HydroAI from idea to competition-winning startup. Lessons for technical entrepreneurs.',
'Startup Journey',
ARRAY['Startup', 'Entrepreneurship', 'Competition', 'MVP', 'HydroAI'],
true, 'en', 12,
'From Idea to Competition Winner | Startup Development Process',
'Learn the systematic process for developing a competition-winning startup. Real insights from HydroAI development.'),

('Building Custom E-commerce Analytics: Real Client Case Study', 'building-custom-ecommerce-analytics-case-study',
'# Building Custom E-commerce Analytics: Real Client Case Study

How I built a comprehensive analytics platform for a multi-brand e-commerce client, resulting in 25% revenue increase...

## Client Challenge

Multi-brand e-commerce business needed:
- Unified analytics across platforms
- Real-time inventory insights
- Customer behavior analysis
- Automated reporting for stakeholders

## Technical Architecture

### Data Pipeline Design
```mermaid
graph TD
    A[Shopify API] --> D[Data Lake]
    B[Instagram Shopping] --> D
    C[Email Marketing] --> D
    D --> E[ETL Pipeline]
    E --> F[Analytics Database]
    F --> G[Dashboard API]
    G --> H[Real-time Dashboard]
```

### Technology Stack
- **Data Collection**: Python + Apache Airflow
- **Storage**: PostgreSQL + Redis for caching
- **Analytics**: Python + Pandas + NumPy
- **Visualization**: React + Chart.js + D3.js
- **Real-time**: WebSocket connections

## Key Features Implemented

### 1. Multi-Platform Revenue Tracking
```sql
-- Example query for cross-platform revenue analysis
SELECT 
    DATE_TRUNC(''day'', order_date) as date,
    platform,
    SUM(total_amount) as revenue,
    COUNT(*) as orders,
    AVG(total_amount) as avg_order_value
FROM unified_orders 
WHERE order_date >= NOW() - INTERVAL ''30 days''
GROUP BY 1, 2
ORDER BY 1 DESC;
```

### 2. Customer Lifetime Value Analysis
- Cohort analysis implementation
- Predictive CLV modeling
- Churn prediction algorithms

### 3. Inventory Intelligence
- Real-time stock level monitoring
- Demand forecasting
- Automated reorder suggestions

### 4. Performance Dashboards
- Executive summary for C-level
- Operations dashboard for managers
- Campaign performance for marketing

## Implementation Challenges

### Data Quality Issues
- Inconsistent product categorization
- Missing customer data
- Platform-specific formatting differences

**Solution**: Implemented data validation and cleansing pipeline

### Real-time Requirements
- Dashboard needed sub-second updates
- High traffic during peak seasons
- Mobile responsiveness requirements

**Solution**: Microservices architecture with Redis caching

### Scalability Concerns
- Growing from 1K to 10K+ orders/month
- Multiple concurrent users
- Complex analytical queries

**Solution**: Database optimization and query caching

## Results Achieved

### Business Impact
- **25% increase in revenue** through better inventory management
- **40% reduction in stockouts** via predictive analytics
- **60% faster reporting** with automated dashboards
- **15% improvement in customer retention** through targeted campaigns

### Technical Metrics
- **99.9% uptime** over 12 months
- **<2 second** dashboard load times
- **Real-time data processing** with <1 minute latency
- **Mobile-responsive** design for on-the-go access

## Client Testimonial

*"The analytics platform transformed how we understand our business. We went from guessing to knowing exactly which products to stock and when."* - CEO, Multi-Brand E-commerce

## Key Learnings

### Technical Insights
1. **Start with data quality** - No analytics can overcome bad data
2. **Design for mobile first** - Executives check metrics on phones
3. **Cache aggressively** - Real-time doesn''t always mean real-time
4. **Plan for scale early** - It''s harder to optimize later

### Business Insights
1. **Focus on actionable metrics** - Vanity metrics don''t drive decisions
2. **Stakeholder-specific dashboards** - One size doesn''t fit all
3. **Training is crucial** - Best system is useless if not adopted
4. **Iterate based on usage** - Monitor what dashboards are actually used

## Future Enhancements

Currently working on:
- AI-powered demand forecasting
- Automated marketing campaign optimization
- Advanced customer segmentation
- Competitive pricing analysis

## For Other Developers

Building custom analytics requires:
- Deep understanding of business needs
- Strong SQL and data modeling skills
- Frontend skills for compelling visualizations
- DevOps knowledge for reliable deployments

The investment in custom analytics often pays for itself within months through improved decision-making...',
'Complete case study of building custom e-commerce analytics platform. Real client results, technical implementation, and business impact.',
'Client Success Stories',
ARRAY['E-commerce', 'Analytics', 'Case Study', 'Business Intelligence', 'React'],
true, 'en', 15,
'Custom E-commerce Analytics Case Study | Business Intelligence Developer',
'Real client case study: How custom e-commerce analytics delivered 25% revenue increase. Technical implementation and business results.');