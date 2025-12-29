-- Exam templates table - reusable exam questions for admin library
CREATE TABLE IF NOT EXISTS public.exam_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text,
  category text,
  difficulty difficulty_enum NOT NULL DEFAULT 'beginner',
  author_id uuid REFERENCES public.admin_users(user_id) ON DELETE SET NULL,
  status exam_status_enum NOT NULL DEFAULT 'draft',
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.exam_templates ENABLE ROW LEVEL SECURITY;

-- Indexes for filtering and sorting
CREATE INDEX IF NOT EXISTS exam_templates_author_id_idx ON public.exam_templates(author_id);
CREATE INDEX IF NOT EXISTS exam_templates_status_idx ON public.exam_templates(status);
CREATE INDEX IF NOT EXISTS exam_templates_category_idx ON public.exam_templates(category);
CREATE INDEX IF NOT EXISTS exam_templates_difficulty_idx ON public.exam_templates(difficulty);
