import { Code, Bot, BarChart, Rocket, Star, CheckCircle, Palette, Box } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      icon: <Code className="h-12 w-12 text-primary" />,
      title: t('skills.fullstack.title'),
      level: t('skills.fullstack.level'),
      skills: [
        "React.js & Vue.js (Advanced)",
        "Node.js & Express.js (Expert)",
        "JavaScript/TypeScript (Advanced)",
        "Python & Django (Intermediate)",
        "HTML5/CSS3 & Responsive Design",
        "RESTful APIs & GraphQL",
        "Database Design (MongoDB, PostgreSQL)",
        "Version Control (Git/GitHub)"
      ],
      badge: t('skills.fullstack.badge')
    },
    {
      icon: <Palette className="h-12 w-12 text-ai-purple" />,
      title: t('skills.branding.title'),
      level: t('skills.branding.level'),
      skills: [
        "Brand Strategy & Identity Development",
        "Logo Design & Visual Identity",
        "Brand Guidelines & Style Systems",
        "Marketing Material Design",
        "Digital Brand Assets Creation",
        "Brand Positioning & Messaging",
        "Client Brand Consultation",
        "Multi-Brand Portfolio Management"
      ],
      badge: t('skills.branding.badge')
    },
    {
      icon: <Box className="h-12 w-12 text-primary" />,
      title: t('skills.3d.title'),
      level: t('skills.3d.level'),
      skills: [
        "3D Product Modeling & Visualization",
        "Character Modeling & Rigging",
        "Architectural 3D Rendering",
        "Motion Graphics & Animation",
        "Texture Design & UV Mapping",
        "Lighting & Environment Setup",
        "Render Optimization & Post-Processing",
        "Interactive 3D Web Integration"
      ],
      badge: "Creative Specialist"
    },
    {
      icon: <Bot className="h-12 w-12 text-ai-purple" />,
      title: "AI & Machine Learning",
      level: "Advanced Specialist",
      skills: [
        "Prompt Engineering (GPT-4, Claude)",
        "Custom AI Model Development",
        "TensorFlow & Machine Learning",
        "Natural Language Processing",
        "Computer Vision Applications",
        "AI Integration & APIs",
        "Data Science & Analytics",
        "Predictive Modeling"
      ],
      badge: "Innovation Expert"
    },
    {
      icon: <BarChart className="h-12 w-12 text-success" />,
      title: "Business Intelligence",
      level: "Google Certified",
      skills: [
        "Google BI & Data Analytics (Certified)",
        "Tableau & Power BI",
        "D3.js & Data Visualization",
        "Statistical Analysis",
        "KPI Development & Tracking",
        "Automated Reporting",
        "ETL Processes",
        "Dashboard Design"
      ],
      badge: "Google Certified"
    },
    {
      icon: <Rocket className="h-12 w-12 text-gold" />,
      title: "Business & Strategy",
      level: "Proven Success",
      skills: [
        "Startup Founding & Management",
        "Brand Strategy & Development",
        "Visual Identity & Logo Design",
        "Brand Positioning & Messaging",
        "E-commerce Platform Development",
        "Digital Marketing & SEO",
        "Project Management (Agile)",
        "Client Relationship Management"
      ],
      badge: "Competition Winner"
    }
  ];

  const techTools = [
    { name: "React", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "AI/ML" },
    { name: "MongoDB", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
    { name: "TypeScript", category: "Language" },
    { name: "TensorFlow", category: "AI/ML" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Stripe", category: "Payments" },
    { name: "Figma", category: "Design" },
    { name: "Adobe Creative Suite", category: "Design" },
    { name: "Blender", category: "3D" },
    { name: "Three.js", category: "3D" },
    { name: "Cinema 4D", category: "3D" },
    { name: "After Effects", category: "Animation" },
    { name: "Sketch", category: "Design" },
    { name: "Netlify", category: "Deployment" }
  ];

  const certifications = [
    {
      icon: "🎓",
      title: "Google Professional Certificates",
      items: [
        "Business Intelligence Professional Certificate",
        "Data Analytics Professional Certificate"
      ],
      date: "2024",
      badge: "Google Certified"
    },
    {
      icon: "🏆",
      title: "Competition Success",
      items: [
        "Multiple 1st Place Wins",
        "Startup Competition Victor",
        "Innovation Awards"
      ],
      impact: "Beat 200+ competing teams",
      badge: "Validated Innovation"
    },
    {
      icon: "🎯",
      title: "Professional Impact",
      items: [
        "50+ Production Users",
        "Multiple Client Projects",
        "Real Business Results"
      ],
      metrics: "40% efficiency improvements",
      badge: "Proven Results"
    }
  ];

  const languages = [
    { name: "Arabic", level: "Native fluency" },
    { name: "French", level: "Professional fluency" },
    { name: "English", level: "Professional fluency" }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Real-World Projects":
        return "client";
      case "Real Client Brands":
        return "ai";
      case "Creative Specialist":
        return "custom";
      case "Google Certified":
        return "success";
      case "Innovation Expert":
        return "ai";
      case "Competition Winner":
        return "gold";
      case "Validated Innovation":
        return "gold";
      case "Proven Results":
        return "production";
      default:
        return "default";
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t('skills.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Main Skills Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-6">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{category.title}</h3>
              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-gold mr-2 fill-current" />
                <span className="text-sm font-medium text-muted-foreground">{category.level}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{skill}</span>
                  </li>
                ))}
              </ul>
              <Badge variant={getBadgeVariant(category.badge)} className="mt-auto">
                {category.badge}
              </Badge>
            </div>
          ))}
        </div>

        {/* Technical Tools & Platforms */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">{t('skills.tools.title')}</h3>
          <div className="bg-muted/50 p-6 rounded-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {techTools.map((tool, index) => (
                <div 
                  key={index} 
                  className="bg-card p-4 rounded-lg text-center hover:bg-card/80 transition-colors duration-200 border"
                >
                  <div className="text-sm font-medium text-card-foreground">{tool.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{tool.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages & Communication */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">{t('skills.languages.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {languages.map((language, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border text-center">
                <h4 className="font-semibold text-card-foreground mb-2">{language.name}</h4>
                <p className="text-muted-foreground">{language.level}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">{t('skills.certs.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-card p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h4 className="text-xl font-semibold mb-4 text-card-foreground">{cert.title}</h4>
                <ul className="space-y-2 mb-4">
                  {cert.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground flex items-start">
                      <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {cert.date && (
                  <p className="text-sm text-muted-foreground mb-2">Completed: {cert.date}</p>
                )}
                {cert.impact && (
                  <p className="text-sm font-medium text-primary mb-2">{cert.impact}</p>
                )}
                {cert.metrics && (
                  <p className="text-sm font-medium text-success mb-4">{cert.metrics}</p>
                )}
                <Badge variant={getBadgeVariant(cert.badge)}>
                  {cert.badge}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;