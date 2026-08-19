-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Draughtsman Studio — Admin Panel Database Schema
-- Run this in your Supabase SQL Editor to create all tables
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- ───────────────────────────────────
-- 1. Portfolio Images
-- ───────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  cloudinary_id TEXT NOT NULL,
  category TEXT,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────
-- 2. Projects
-- ───────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  client TEXT,
  year INTEGER,
  category TEXT,
  thumbnail_url TEXT,
  cloudinary_id TEXT,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────
-- 3. Services
-- ───────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────
-- 4. About (single row — upsert only)
-- ───────────────────────────────────
CREATE TABLE IF NOT EXISTS about (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  headline TEXT,
  body_html TEXT,
  photo_url TEXT,
  cloudinary_id TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  socials_json JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default row
INSERT INTO about (headline, body_html, email) 
VALUES ('About Draughtsman Studio', '<p>Welcome to our studio.</p>', 'info@draughtsmanstudio.com')
ON CONFLICT DO NOTHING;

-- ───────────────────────────────────
-- 5. Hero (single row — upsert only)
-- ───────────────────────────────────
CREATE TABLE IF NOT EXISTS hero (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  headline TEXT,
  subheadline TEXT,
  cta_text TEXT,
  cta_link TEXT,
  bg_image_url TEXT,
  cloudinary_id TEXT,
  bg_video_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default row
INSERT INTO hero (headline, subheadline, cta_text, cta_link)
VALUES ('Draughtsman Studio', 'Architecture & Interior Design', 'View Our Work', '/portfolio')
ON CONFLICT DO NOTHING;

-- ───────────────────────────────────
-- 6. Testimonials
-- ───────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  photo_url TEXT,
  cloudinary_id TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────
-- 7. Contact Submissions
-- ───────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- ROW LEVEL SECURITY
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- Enable RLS on all tables
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies (only published content)
CREATE POLICY "Public can read published portfolio images"
  ON portfolio_images FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published services"
  ON services FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read about"
  ON about FOR SELECT
  USING (true);

CREATE POLICY "Public can read hero"
  ON hero FOR SELECT
  USING (true);

CREATE POLICY "Public can read published testimonials"
  ON testimonials FOR SELECT
  USING (published = true);

-- Contact submissions: allow public inserts (for the contact form)
CREATE POLICY "Public can insert contact submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Service role has full access (bypasses RLS by default)
-- No additional policies needed for service_role

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- INDEXES for performance
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE INDEX idx_portfolio_published ON portfolio_images (published, display_order);
CREATE INDEX idx_projects_published ON projects (published, display_order);
CREATE INDEX idx_services_published ON services (published, display_order);
CREATE INDEX idx_testimonials_published ON testimonials (published, created_at);
CREATE INDEX idx_submissions_status ON contact_submissions (read, archived, created_at);
