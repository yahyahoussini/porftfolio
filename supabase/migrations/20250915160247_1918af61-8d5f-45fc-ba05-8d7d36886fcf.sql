-- Insert sample analytics data for demonstration
INSERT INTO analytics_visitors (session_id, user_agent, referrer, landing_page, country, city, device_type, browser, session_duration, page_views)
VALUES 
  ('sess_001', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'https://google.com', '/', 'United States', 'New York', 'Desktop', 'Chrome', 180, 3),
  ('sess_002', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', 'https://linkedin.com', '/blog', 'Canada', 'Toronto', 'Mobile', 'Safari', 120, 2),
  ('sess_003', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15', null, '/', 'France', 'Paris', 'Desktop', 'Safari', 240, 4),
  ('sess_004', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0', 'https://github.com', '/blog', 'Morocco', 'Casablanca', 'Mobile', 'Firefox', 90, 1),
  ('sess_005', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101', 'https://google.com', '/', 'Germany', 'Berlin', 'Desktop', 'Firefox', 300, 5),
  ('sess_006', 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15', null, '/blog', 'United Kingdom', 'London', 'Tablet', 'Safari', 150, 2),
  ('sess_007', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36', 'https://linkedin.com', '/', 'Netherlands', 'Amsterdam', 'Desktop', 'Chrome', 200, 3),
  ('sess_008', 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)', null, '/', 'Spain', 'Madrid', 'Mobile', 'Safari', 110, 2);

-- Insert sample analytics events
INSERT INTO analytics_events (session_id, event_type, event_data, page_url)
VALUES 
  ('sess_001', 'page_view', '{"page": "home"}', '/'),
  ('sess_001', 'cv_download', '{"filename": "resume.pdf"}', '/'),
  ('sess_002', 'project_click', '{"project": "hydro-ai"}', '/'),
  ('sess_003', 'demo_click', '{"project": "brand-ai"}', '/'),
  ('sess_004', 'page_view', '{"page": "blog"}', '/blog'),
  ('sess_005', 'form_submit', '{"form": "contact"}', '/'),
  ('sess_006', 'project_click', '{"project": "commerce-analytics"}', '/'),
  ('sess_007', 'cv_download', '{"filename": "resume.pdf"}', '/'),
  ('sess_008', 'page_view', '{"page": "home"}', '/');

-- Insert sample contact submissions
INSERT INTO contact_submissions (name, email, message, source, lead_score, status)
VALUES 
  ('John Smith', 'john.smith@techcorp.com', 'Interested in your AI development services for our e-commerce platform. We need someone with your expertise in machine learning.', 'contact_form', 9, 'new'),
  ('Sarah Johnson', 'sarah@startup.io', 'Hi! Saw your hydroponic AI project. Very impressive! We are looking for a full-stack developer for our agtech startup.', 'contact_form', 8, 'contacted'),
  ('Ahmed Hassan', 'ahmed@consulting.ma', 'Bonjour, nous cherchons un développeur avec expertise en BI pour notre équipe à Casablanca. Votre profil correspond parfaitement.', 'contact_form', 7, 'new'),
  ('Lisa Chen', 'lisa.chen@innovate.com', 'Your Google BI certification caught our attention. We have an immediate opening for a Business Intelligence Analyst position.', 'contact_form', 9, 'new'),
  ('Mike Rodriguez', 'mike@webdev.com', 'Love your portfolio design! Could you help us rebuild our company website with similar functionality?', 'contact_form', 6, 'responded');