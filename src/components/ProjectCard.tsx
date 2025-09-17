import { Button } from '@/components/ui/button';
import { ExternalLink, Github, FileText } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  impact: string;
  badges: { text: string; type: string }[];
  image: string;
  buttons: { text: string; icon: any; variant?: 'default' | 'outline' | 'secondary' }[];
}

const ProjectCard = ({
  title,
  description,
  features,
  technologies,
  impact,
  badges,
  image,
  buttons,
}: ProjectCardProps) => {
  return (
    <div className="project-card overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`achievement-badge ${badge.type} text-xs`}
            >
              {badge.text}
            </div>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-card-foreground mb-3 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        {/* Key Features */}
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-card-foreground mb-2">Key Features:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary font-mono text-xs mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-card-foreground mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="mb-6">
          <h4 className="font-semibold text-sm text-card-foreground mb-2">Impact:</h4>
          <p className="text-sm text-success font-medium">{impact}</p>
        </div>

        {/* Buttons */}
        <div className="mt-auto pt-4 border-t border-border/50">
          <div className="flex flex-col sm:flex-row gap-2">
            {buttons.map((button, index) => {
              const IconComponent = button.icon;
              return (
                <Button
                  key={index}
                  variant={button.variant || 'default'}
                  size="sm"
                  className="flex items-center gap-2 flex-1"
                >
                  <IconComponent className="w-4 h-4" />
                  {button.text}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;