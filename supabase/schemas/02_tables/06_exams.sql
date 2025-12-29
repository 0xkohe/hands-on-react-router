-- Exams table - tenant-specific exams
CREATE TABLE IF NOT EXISTS public.exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT '',
  description text,
  template_id uuid REFERENCES public.exam_templates(id) ON DELETE SET NULL,
  difficulty difficulty_enum NOT NULL DEFAULT 'beginner',
  duration_minutes integer,
  passing_score integer DEFAULT 70,
  is_private boolean NOT NULL DEFAULT false,
  created_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

-- Indexes for multi-tenant isolation and filtering
CREATE INDEX IF NOT EXISTS exams_tenant_id_idx ON public.exams(tenant_id);
CREATE INDEX IF NOT EXISTS exams_template_id_idx ON public.exams(template_id);
CREATE INDEX IF NOT EXISTS exams_created_by_idx ON public.exams(created_by);
