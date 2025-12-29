-- Exam answers table - detailed question-level answers and feedback
CREATE TABLE IF NOT EXISTS public.exam_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_result_id uuid NOT NULL REFERENCES public.exam_results(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public.exam_questions(id) ON DELETE CASCADE,
  user_answer text,
  is_correct boolean NOT NULL DEFAULT false,
  points_earned integer DEFAULT 0,
  feedback text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;

-- Indexes for detailed result querying
CREATE INDEX IF NOT EXISTS exam_answers_exam_result_id_idx ON public.exam_answers(exam_result_id);
CREATE INDEX IF NOT EXISTS exam_answers_question_id_idx ON public.exam_answers(question_id);
