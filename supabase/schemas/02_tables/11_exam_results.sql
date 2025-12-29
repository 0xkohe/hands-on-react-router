-- Exam results table - overall exam performance tracking
CREATE TABLE IF NOT EXISTS public.exam_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  assignment_id uuid REFERENCES public.assignments(id) ON DELETE SET NULL,
  score integer NOT NULL,
  max_score integer NOT NULL,
  percentage_score integer GENERATED ALWAYS AS (ROUND(100.0 * score / max_score)) STORED,
  time_spent_seconds integer,
  attempted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

-- Indexes for filtering and analytics
CREATE INDEX IF NOT EXISTS exam_results_exam_id_idx ON public.exam_results(exam_id);
CREATE INDEX IF NOT EXISTS exam_results_user_id_idx ON public.exam_results(user_id);
CREATE INDEX IF NOT EXISTS exam_results_assignment_id_idx ON public.exam_results(assignment_id);
CREATE INDEX IF NOT EXISTS exam_results_completed_at_idx ON public.exam_results(completed_at);
