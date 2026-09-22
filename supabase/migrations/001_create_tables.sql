-- Create team_members table
CREATE TABLE team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample team data
INSERT INTO team_members (id, name, role, description) VALUES
  ('1', '김민준', 'CEO & 창립자', '10년의 기술 리더십 경험'),
  ('2', '이수진', 'CTO', '클라우드 아키텍처 전문가'),
  ('3', '박지현', '리드 개발자', '풀스택 개발 및 DevOps'),
  ('4', '최영민', '디자인 리드', 'UX/UI 디자인 전문가');

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security for team_members (read-only)
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON team_members
  FOR SELECT USING (true);

-- Enable Row Level Security for contact_submissions (insert-only)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert access for all users" ON contact_submissions
  FOR INSERT WITH CHECK (true);
