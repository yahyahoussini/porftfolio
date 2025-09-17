import ProjectCard from './ProjectCard';
import { ExternalLink, Github, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import hydroAiImage from '@/assets/hydro-ai-project.jpg';
import commerceImage from '@/assets/commerce-analytics.jpg';
import brandAiImage from '@/assets/brand-ai-project.jpg';

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('project.hydro.title'),
      description: t('project.hydro.description'),
      features: [
        t('project.hydro.features').split(', ')[0],
        t('project.hydro.features').split(', ')[1],
        t('project.hydro.features').split(', ')[2],
        t('project.hydro.features').split(', ')[3],
        t('project.hydro.features').split(', ')[4]
      ],
      technologies: ["React", "Node.js", "Python", "TensorFlow", "IoT", "MongoDB", "WebSockets", "PWA"],
      impact: "50+ active commercial users, 40% increased crop yield, 30% reduction in resource waste, Winner of Innovation Competition",
      badges: [
        { text: "🏆 Competition Winner", type: "gold" },
        { text: "👥 50+ Active Users", type: "success" },
        { text: "🤖 AI-Powered", type: "ai" }
      ],
      image: hydroAiImage,
      buttons: [
        { text: "Live Dashboard", icon: ExternalLink, variant: "default" as const },
        { text: "Case Study", icon: FileText, variant: "outline" as const },
        { text: "GitHub", icon: Github, variant: "outline" as const }
      ]
    },
    {
      title: "CommercePro Analytics - E-commerce BI Dashboard", 
      description: "Comprehensive business intelligence platform for e-commerce businesses, combining my Google BI/DA certification with real e-commerce experience. Provides actionable insights for online retailers and marketplaces.",
      features: [
        "Sales performance analytics",
        "Customer behavior tracking",
        "Inventory optimization insights", 
        "Revenue forecasting",
        "Automated reporting"
      ],
      technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "Google Analytics API", "Tableau", "Python"],
      impact: "Used by 10+ e-commerce businesses, 25% improvement in inventory decisions, Real-time sales tracking",
      badges: [
        { text: "📊 Google BI Certified", type: "primary" },
        { text: "💼 Business Intelligence", type: "success" }
      ],
      image: commerceImage,
      buttons: [
        { text: "Live Demo", icon: ExternalLink, variant: "default" as const },
        { text: "Documentation", icon: FileText, variant: "outline" as const },
        { text: "Source Code", icon: Github, variant: "outline" as const }
      ]
    },
    {
      title: "BrandAI - Intelligent Brand Building Assistant",
      description: "AI-powered platform that helps entrepreneurs build strong brands using advanced prompt engineering and my experience building successful brands. Combines GPT-4 with strategic branding frameworks.",
      features: [
        "Brand strategy generation",
        "Logo and visual identity AI",
        "Market positioning analysis",
        "Content strategy automation", 
        "Competitor analysis"
      ],
      technologies: ["React", "Node.js", "OpenAI GPT-4", "DALL-E", "Stripe", "MongoDB"],
      impact: "Helped 30+ startups develop brand strategies, Featured in startup accelerator demo day, Revenue-generating SaaS platform",
      badges: [
        { text: "🤖 Prompt Engineering", type: "ai" },
        { text: "🎨 Branding Expert", type: "gold" }
      ],
      image: brandAiImage,
      buttons: [
        { text: "Try Platform", icon: ExternalLink, variant: "default" as const },
        { text: "Case Studies", icon: FileText, variant: "outline" as const },
        { text: "API Docs", icon: Github, variant: "outline" as const }
      ]
    },
    {
      title: "BrandHub.ma - Complete Agency Management Solution",
      description: "Full-stack management platform built for BrandHub.ma agency, featuring client project management, portfolio showcase, and comprehensive admin dashboard. Complete business solution handling agency operations from lead generation to project delivery.",
      features: [
        "Client project management",
        "Portfolio showcase system",
        "Lead tracking and CRM",
        "Invoice and billing management",
        "Team collaboration tools",
        "Analytics dashboard"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT Authentication", "Payment Integration", "Real-time notifications", "Responsive design"],
      impact: "Streamlined agency operations, 50% reduction in project management time, Improved client satisfaction scores, Active production use",
      badges: [
        { text: "💼 Real Client", type: "client" },
        { text: "🏢 Agency Platform", type: "production" },
        { text: "📊 Admin Dashboard", type: "primary" }
      ],
      image: brandAiImage,
      buttons: [
        { text: "View Live Site", icon: ExternalLink, variant: "default" as const },
        { text: "Admin Demo", icon: FileText, variant: "outline" as const },
        { text: "Case Study", icon: Github, variant: "outline" as const }
      ]
    },
    {
      title: "Multi-Brand E-commerce Platform - Custom Themes",
      description: "Complete e-commerce solution built from scratch for premium cosmetic and footwear brands. Features custom-designed themes, advanced inventory management, and comprehensive admin dashboards tailored for fashion retail.",
      features: [
        "Custom theme development",
        "Multi-vendor support",
        "Inventory management system",
        "Order tracking and fulfillment",
        "Customer analytics",
        "Mobile-first design",
        "Payment gateway integration"
      ],
      technologies: ["React", "Node.js", "Express", "PostgreSQL", "Stripe/PayPal integration", "AWS S3", "Redis caching", "PWA capabilities"],
      impact: "Serving multiple active brands, Custom themes for cosmetic and shoes brands, Increased conversion rates, Professional production deployment",
      badges: [
        { text: "🛍️ E-commerce Expert", type: "success" },
        { text: "🎨 Custom Design", type: "custom" },
        { text: "💳 Payment Integration", type: "production" }
      ],
      image: commerceImage,
      buttons: [
        { text: "View Demo Store", icon: ExternalLink, variant: "default" as const },
        { text: "Admin Dashboard", icon: FileText, variant: "outline" as const },
        { text: "Theme Gallery", icon: Github, variant: "outline" as const }
      ]
    },
    {
      title: "Custom Brand Development Platform",
      description: "Comprehensive brand development and portfolio platform built for multiple clients across different industries. Features custom theme creation, brand management tools, and flexible content management suitable for various business types.",
      features: [
        "Custom theme builder",
        "Brand asset management",
        "Portfolio showcase",
        "Content management system",
        "SEO optimization",
        "Multi-language support",
        "Client dashboard"
      ],
      technologies: ["React", "Vue.js", "Node.js", "MongoDB", "Headless CMS", "Image optimization", "CDN integration", "Analytics integration"],
      impact: "Multiple successful brand launches, Increased brand visibility for clients, Custom solutions for diverse industries, Ongoing client relationships",
      badges: [
        { text: "🎨 Brand Expert", type: "gold" },
        { text: "🚀 From Scratch", type: "custom" },
        { text: "📱 Multi-Purpose", type: "primary" }
      ],
      image: hydroAiImage,
      buttons: [
        { text: "Portfolio Gallery", icon: ExternalLink, variant: "default" as const },
        { text: "Brand Showcase", icon: FileText, variant: "outline" as const },
        { text: "Development Process", icon: Github, variant: "outline" as const }
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text-hero">{t('projects.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;