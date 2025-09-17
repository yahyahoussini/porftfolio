const About = () => {
  const skills = [
    {
      category: "Frontend Development",
      items: ["React", "Vue.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Responsive Design", "PWA"]
    },
    {
      category: "Backend Development", 
      items: ["Node.js", "Python", "Express.js", "RESTful APIs", "Microservices", "Database Design"]
    },
    {
      category: "AI & Machine Learning",
      items: ["Prompt Engineering", "GPT-4 Integration", "TensorFlow", "Custom AI Models", "Data Science"]
    },
    {
      category: "Business Intelligence",
      items: ["Google BI/DA Certified", "Tableau", "D3.js", "Data Visualization", "Analytics Implementation"]
    },
    {
      category: "E-commerce & Business",
      items: ["Platform Development", "Digital Marketing", "Brand Strategy", "User Experience", "Conversion Optimization"]
    },
    {
      category: "Languages",
      items: ["Arabic (Native)", "French (Fluent)", "English (Professional)"]
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Personal Story */}
          <div className="space-y-6 fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span className="gradient-text-hero">About Me</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a full-stack developer and AI engineer with a unique background bridging 
                entrepreneurship and technology. As a university student in Morocco, I founded 
                and developed an AI-powered hydroponic innovation system that won multiple 
                startup competitions and now serves over 50 commercial farms.
              </p>
              
              <p>
                My approach combines deep technical skills with real business understanding. 
                I don't just build features—I solve problems that matter. My Google certifications 
                in Business Intelligence and Data Analytics, combined with hands-on experience 
                building brands and e-commerce platforms, allow me to create applications that 
                are both technically excellent and commercially successful.
              </p>
              
              <p>
                Currently seeking full-stack developer opportunities where I can leverage my 
                unique combination of AI expertise, business intelligence skills, and proven 
                entrepreneurial success to create impactful solutions.
              </p>
            </div>

            {/* Key Achievements */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-card rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-success">50+</div>
                <div className="text-sm text-muted-foreground">Active Commercial Users</div>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-gold">🏆</div>
                <div className="text-sm text-muted-foreground">Competition Winner</div>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">📊</div>
                <div className="text-sm text-muted-foreground">Google BI/DA Certified</div>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-ai-purple">🤖</div>
                <div className="text-sm text-muted-foreground">AI Innovation Expert</div>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="slide-up">
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">
              Skills & <span className="gradient-text-ai">Technologies</span>
            </h3>
            
            <div className="grid gap-6">
              {skills.map((skillGroup, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-5 border border-border/50 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h4 className="font-semibold text-card-foreground mb-3 text-sm uppercase tracking-wide">
                    {skillGroup.category}
                  </h4>
                  
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;