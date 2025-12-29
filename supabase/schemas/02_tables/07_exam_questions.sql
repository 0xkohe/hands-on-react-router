-- Exam questions table - individual questions for exams
CREATE TABLE IF NOT EXISTS public.exam_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question_text text NOT NULL DEFAULT '',
  question_type question_type_enum NOT NULL DEFAULT 'multiple_choice',
  order_index integer,
  points integer DEFAULT 10,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;

-- Index for exam lookup
CREATE INDEX IF NOT EXISTS exam_questions_exam_id_idx ON public.exam_questions(exam_id);
CREATE INDEX IF NOT EXISTS exam_questions_order_idx ON public.exam_questions(exam_id, order_index);
