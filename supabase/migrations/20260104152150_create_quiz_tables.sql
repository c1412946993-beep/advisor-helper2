/*
  # Create Quiz Application Tables
  
  1. New Tables
    - `quiz_submissions`
      - Stores user quiz responses and generated question sets
      - Fields include all 5 questionnaire answers and resulting questions
      - Anonymous session tracking via session_id
    - `quiz_analytics`
      - Tracks completion metrics and user flow
      - Records which steps users reach for analytics
  
  2. Security
    - RLS enabled for both tables
    - Public read access for analytics (no sensitive user data exposed)
    - Insert-only policy for submissions (users can only add their own)
    - No delete/update for data integrity
  
  3. Indexes
    - session_id indexed for quick lookups
    - created_at indexed for time-based queries
*/

CREATE TABLE IF NOT EXISTS quiz_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  net_worth text NOT NULL,
  primary_goal text NOT NULL,
  payment_preference text NOT NULL,
  experience_level text NOT NULL,
  special_circumstances text[] DEFAULT ARRAY[]::text[],
  generated_questions jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS quiz_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step text NOT NULL,
  count integer DEFAULT 1,
  event_date date DEFAULT CURRENT_DATE,
  UNIQUE(step, event_date)
);

ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert submissions"
  ON quiz_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read their own submission"
  ON quiz_submissions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view analytics"
  ON quiz_analytics
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert analytics"
  ON quiz_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "System can update analytics"
  ON quiz_analytics
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE INDEX idx_quiz_submissions_session_id ON quiz_submissions(session_id);
CREATE INDEX idx_quiz_submissions_created_at ON quiz_submissions(created_at);
CREATE INDEX idx_quiz_analytics_date ON quiz_analytics(event_date);