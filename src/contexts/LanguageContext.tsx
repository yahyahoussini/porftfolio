import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.about': 'About', 
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.downloadCV': 'Download CV',

    // Blog Section
    'blog.title': 'Insights & Expertise',
    'blog.subtitle': 'Technical insights, business intelligence, and real-world development experiences',
    'blog.searchPlaceholder': 'Search articles...',
    'blog.search': 'Search',
    'blog.categories': 'Categories',
    'blog.allCategories': 'All Categories',
    'blog.noPosts': 'No posts found matching your criteria.',
    'blog.readMore': 'Read More',
    'blog.minRead': 'min read',
    'blog.by': 'by',
    'blog.share': 'Share',
    'blog.postNotFound': 'Post Not Found',
    'blog.backToBlog': 'Back to Blog',
    'blog.relatedPosts': 'Related Posts',

    // Hero Section
    'hero.title': 'Full Stack Developer & AI Engineer',
    'hero.subtitle': 'Competition-winning startup founder building AI-powered solutions that serve real users',
    'hero.badge.winner': '🏆 Competition Winner',
    'hero.badge.certified': '📊 Google BI/DA Certified', 
    'hero.badge.users': '👥 50+ Active Users',
    'hero.badge.expert': '🤖 AI Innovation Expert',
    'hero.cta.work': 'View My Work',
    'hero.cta.contact': 'Get In Touch',

    // Projects Section
    'projects.title': 'Real-World Applications & Innovations',
    'projects.subtitle': 'Production applications serving real users, winning competitions, and powering actual businesses',
    
    // HydroAI Project
    'project.hydro.title': 'HydroAI - Smart Hydroponic Innovation System',
    'project.hydro.badge.winner': '🏆 Competition Winner',
    'project.hydro.badge.users': '👥 50+ Active Users', 
    'project.hydro.badge.ai': '🤖 AI-Powered',
    'project.hydro.description': 'Award-winning hydroponic management platform powered by dedicated AI models. Complete IoT solution with real-time monitoring, automated control systems, and predictive growth analytics serving 50+ commercial hydroponic farms.',
    'project.hydro.features': 'AI-powered growth prediction, Real-time sensor monitoring, Automated nutrient management, Mobile-responsive dashboard, Predictive maintenance alerts',
    'project.hydro.impact': '50+ active commercial users, 40% increased crop yield, 30% reduction in resource waste, Winner of Innovation Competition',
    'project.hydro.btn1': 'View Live Dashboard',
    'project.hydro.btn2': 'Case Study',
    'project.hydro.btn3': 'GitHub',

    // Commerce Project
    'project.commerce.title': 'CommercePro Analytics - E-commerce BI Dashboard',
    'project.commerce.description': 'Comprehensive business intelligence platform for e-commerce businesses, combining my Google BI/DA certification with real e-commerce experience. Provides actionable insights for online retailers and marketplaces.',
    'project.commerce.btn1': 'Live Demo',
    'project.commerce.btn2': 'Documentation',
    'project.commerce.btn3': 'Source Code',

    // Brand AI Project
    'project.brandai.title': 'BrandAI - Intelligent Brand Building Assistant',
    'project.brandai.description': 'AI-powered platform that helps entrepreneurs build strong brands using advanced prompt engineering and my experience building successful brands. Combines GPT-4 with strategic branding frameworks.',
    'project.brandai.btn1': 'Try Platform',
    'project.brandai.btn2': 'Case Studies', 
    'project.brandai.btn3': 'API Docs',

    // Client Projects
    'project.brandhub.title': 'BrandHub.ma - Complete Agency Management Solution',
    'project.brandhub.description': 'Full-stack management platform built for BrandHub.ma agency, featuring client project management, portfolio showcase, and comprehensive admin dashboard. Complete business solution handling agency operations from lead generation to project delivery.',

    'project.ecommerce.title': 'Multi-Brand E-commerce Platform - Custom Themes',
    'project.ecommerce.description': 'Complete e-commerce solution built from scratch for premium cosmetic and footwear brands. Features custom-designed themes, advanced inventory management, and comprehensive admin dashboards tailored for fashion retail.',

    'project.brandplatform.title': 'Custom Brand Development Platform',
    'project.brandplatform.description': 'Comprehensive brand development and portfolio platform built for multiple clients across different industries. Features custom theme creation, brand management tools, and flexible content management suitable for various business types.',

    // Skills Section  
    'skills.title': 'Skills & Expertise',
    'skills.subtitle': 'Technical proficiency meets business acumen and real-world experience',
    
    'skills.fullstack.title': 'Full-Stack Development',
    'skills.fullstack.level': 'Expert Level',
    'skills.fullstack.badge': 'Real-World Projects',

    'skills.branding.title': 'Branding & Design Expert',
    'skills.branding.level': 'Professional Experience',
    'skills.branding.badge': 'Real Client Brands',

    'skills.3d.title': '3D Modeling & Animation',
    'skills.3d.level': 'Expert Level',
    'skills.3d.badge': 'Creative Specialist',

    'skills.ai.title': 'AI & Machine Learning',
    'skills.ai.level': 'Advanced Specialist',
    'skills.ai.badge': 'Innovation Expert',

    'skills.bi.title': 'Business Intelligence',
    'skills.bi.level': 'Google Certified',
    'skills.bi.badge': 'Google Certified',

    'skills.business.title': 'Business & Strategy',
    'skills.business.level': 'Proven Success',
    'skills.business.badge': 'Competition Winner',

    'skills.tools.title': 'Technical Tools & Platforms',
    'skills.languages.title': 'Languages & Communication',
    'skills.certs.title': 'Certifications & Achievements',

    // About Section
    'about.title': 'About Me',
    'about.content': "I'm a full-stack developer and AI engineer with a unique background bridging entrepreneurship and technology. As a university student in Morocco, I founded and developed an AI-powered hydroponic innovation system that won multiple startup competitions and now serves over 50 commercial farms.\n\nMy approach combines deep technical skills with real business understanding. I don't just build features—I solve problems that matter. My Google certifications in Business Intelligence and Data Analytics, combined with hands-on experience building brands and e-commerce platforms, allow me to create applications that are both technically excellent and commercially successful.\n\nCurrently seeking full-stack developer opportunities where I can leverage my unique combination of AI expertise, business intelligence skills, and proven entrepreneurial success to create impactful solutions.",

    // Contact Section
    'contact.title': "Let's Build Something Amazing",
    'contact.subtitle': 'Ready to discuss how my unique combination of technical skills and business experience can add value to your team?',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message', 
    'contact.form.send': 'Send Message',

    // Footer
    'footer.copyright': '© 2025 Portfolio. All rights reserved.',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.projects': 'Projets',
    'nav.blog': 'Blog',
    'nav.about': 'À Propos',
    'nav.skills': 'Compétences', 
    'nav.contact': 'Contact',
    'nav.downloadCV': 'Télécharger CV',

    // Blog Section  
    'blog.title': 'Insights & Expertise',
    'blog.subtitle': 'Insights techniques, intelligence d\'affaires, et expériences de développement du monde réel',
    'blog.searchPlaceholder': 'Rechercher des articles...',
    'blog.search': 'Rechercher',
    'blog.categories': 'Catégories',
    'blog.allCategories': 'Toutes les Catégories',
    'blog.noPosts': 'Aucun article trouvé correspondant à vos critères.',
    'blog.readMore': 'Lire Plus',
    'blog.minRead': 'min de lecture',
    'blog.by': 'par',
    'blog.share': 'Partager',
    'blog.postNotFound': 'Article Non Trouvé',
    'blog.backToBlog': 'Retour au Blog',
    'blog.relatedPosts': 'Articles Connexes',

    // Hero Section
    'hero.title': 'Développeur Full Stack & Ingénieur IA',
    'hero.subtitle': 'Fondateur de startup primé développant des solutions alimentées par l\'IA qui servent de vrais utilisateurs',
    'hero.badge.winner': '🏆 Gagnant de Concours',
    'hero.badge.certified': '📊 Certifié Google BI/DA',
    'hero.badge.users': '👥 Plus de 50 Utilisateurs',
    'hero.badge.expert': '🤖 Expert en Innovation IA',
    'hero.cta.work': 'Voir Mon Travail',
    'hero.cta.contact': 'Me Contacter',

    // Projects Section
    'projects.title': 'Applications Réelles & Innovations',
    'projects.subtitle': 'Applications de production servant de vrais utilisateurs, gagnant des concours, et alimentant de vraies entreprises',
    
    // HydroAI Project
    'project.hydro.title': 'HydroAI - Système d\'Innovation Hydroponique Intelligent',
    'project.hydro.badge.winner': '🏆 Gagnant de Concours',
    'project.hydro.badge.users': '👥 Plus de 50 Utilisateurs',
    'project.hydro.badge.ai': '🤖 Alimenté par l\'IA',
    'project.hydro.description': 'Plateforme de gestion hydroponique primée alimentée par des modèles d\'IA dédiés. Solution IoT complète avec surveillance en temps réel, systèmes de contrôle automatisés, et analyses prédictives de croissance servant plus de 50 fermes hydroponiques commerciales.',
    'project.hydro.features': 'Prédiction de croissance alimentée par l\'IA, Surveillance de capteurs en temps réel, Gestion automatisée des nutriments, Tableau de bord responsive mobile, Alertes de maintenance prédictive',
    'project.hydro.impact': 'Plus de 50 utilisateurs commerciaux actifs, 40% d\'augmentation du rendement des cultures, 30% de réduction du gaspillage des ressources, Gagnant du Concours d\'Innovation',
    'project.hydro.btn1': 'Voir le Tableau de Bord',
    'project.hydro.btn2': 'Étude de Cas',
    'project.hydro.btn3': 'GitHub',

    // Commerce Project
    'project.commerce.title': 'CommercePro Analytics - Tableau de Bord BI E-commerce',
    'project.commerce.description': 'Plateforme complète de business intelligence pour les entreprises e-commerce, combinant ma certification Google BI/DA avec une vraie expérience e-commerce. Fournit des insights actionnables pour les détaillants en ligne et les marketplaces.',
    'project.commerce.btn1': 'Démo en Direct',
    'project.commerce.btn2': 'Documentation',
    'project.commerce.btn3': 'Code Source',

    // Brand AI Project
    'project.brandai.title': 'BrandAI - Assistant Intelligent de Construction de Marque',
    'project.brandai.description': 'Plateforme alimentée par l\'IA qui aide les entrepreneurs à construire des marques fortes en utilisant l\'ingénierie de prompts avancée et mon expérience dans la construction de marques réussies.',
    'project.brandai.btn1': 'Essayer la Plateforme',
    'project.brandai.btn2': 'Études de Cas',
    'project.brandai.btn3': 'Documentation API',

    // Client Projects
    'project.brandhub.title': 'BrandHub.ma - Solution Complète de Gestion d\'Agence',
    'project.brandhub.description': 'Plateforme de gestion full-stack construite pour l\'agence BrandHub.ma, avec gestion de projets clients, vitrine de portfolio, et tableau de bord administratif complet.',

    'project.ecommerce.title': 'Plateforme E-commerce Multi-Marques - Thèmes Personnalisés', 
    'project.ecommerce.description': 'Solution e-commerce complète construite from scratch pour des marques cosmétiques et de chaussures premium. Comprend des thèmes sur mesure et des tableaux de bord administratifs avancés.',

    'project.brandplatform.title': 'Plateforme de Développement de Marque Personnalisée',
    'project.brandplatform.description': 'Plateforme complète de développement de marque et portfolio construite pour plusieurs clients dans différentes industries.',

    // Skills Section
    'skills.title': 'Compétences & Expertise',
    'skills.subtitle': 'La maîtrise technique rencontre le sens des affaires et l\'expérience du monde réel',

    'skills.fullstack.title': 'Développement Full-Stack',
    'skills.fullstack.level': 'Niveau Expert',
    'skills.fullstack.badge': 'Projets du Monde Réel',

    'skills.branding.title': 'Expert en Image de Marque & Design',
    'skills.branding.level': 'Expérience Professionnelle',
    'skills.branding.badge': 'Vraies Marques Clients',

    'skills.3d.title': 'Modélisation & Animation 3D',
    'skills.3d.level': 'Niveau Expert',
    'skills.3d.badge': 'Spécialiste Créatif',

    'skills.ai.title': 'IA & Apprentissage Automatique',
    'skills.ai.level': 'Spécialiste Avancé',
    'skills.ai.badge': 'Expert en Innovation',

    'skills.bi.title': 'Intelligence d\'Affaires',
    'skills.bi.level': 'Certifié Google',
    'skills.bi.badge': 'Certifié Google',

    'skills.business.title': 'Affaires & Stratégie',
    'skills.business.level': 'Succès Prouvé',
    'skills.business.badge': 'Gagnant de Concours',

    'skills.tools.title': 'Outils & Plateformes Techniques',
    'skills.languages.title': 'Langues & Communication',
    'skills.certs.title': 'Certifications & Réalisations',

    // About Section
    'about.title': 'À Propos de Moi',
    'about.content': "Je suis un développeur full-stack et ingénieur IA avec un background unique qui fait le pont entre l'entrepreneuriat et la technologie. En tant qu'étudiant universitaire au Maroc, j'ai fondé et développé un système d'innovation hydroponique alimenté par l'IA qui a remporté plusieurs concours de startups et sert maintenant plus de 50 fermes commerciales.\n\nMon approche combine des compétences techniques approfondies avec une vraie compréhension commerciale. Je ne construis pas seulement des fonctionnalités—je résous des problèmes qui comptent. Mes certifications Google en Business Intelligence et Analyse de Données, combinées avec une expérience pratique dans la construction de marques et de plateformes e-commerce, me permettent de créer des applications qui sont à la fois techniquement excellentes et commercialement réussies.\n\nJe recherche actuellement des opportunités de développeur full-stack où je peux tirer parti de ma combinaison unique d'expertise en IA, de compétences en intelligence d'affaires, et de succès entrepreneurial prouvé pour créer des solutions impactantes.",

    // Contact Section
    'contact.title': 'Construisons Quelque Chose d\'Extraordinaire',
    'contact.subtitle': 'Prêt à discuter de comment ma combinaison unique de compétences techniques et d\'expérience commerciale peut ajouter de la valeur à votre équipe?',
    'contact.form.name': 'Nom',
    'contact.form.email': 'E-mail',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer le Message',

    // Footer
    'footer.copyright': '© 2025 Portfolio. Tous droits réservés.',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang') as Language;
    
    // Check localStorage
    const savedLang = localStorage.getItem('language') as Language;
    
    // Detect browser language
    const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
    
    // Priority: URL > localStorage > browser > default
    const initialLang = urlLang || savedLang || browserLang;
    
    if (initialLang === 'fr' || initialLang === 'en') {
      setLanguage(initialLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};