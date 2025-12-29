-- Assignments table - exam assignments given to team members/groups
CREATE TABLE IF NOT EXISTS public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  assigned_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
  target_type assignment_target_type_enum NOT NULL DEFAULT 'group',
  target_id uuid,
  deadline date,
  status assignment_status_enum NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

-- Indexes for filtering and sorting
CREATE INDEX IF NOT EXISTS assignments_tenant_id_idx ON public.assignments(tenant_id);
CREATE INDEX IF NOT EXISTS assignments_exam_id_idx ON public.assignments(exam_id);
CREATE INDEX IF NOT EXISTS assignments_deadline_idx ON public.assignments(deadline);
CREATE INDEX IF NOT EXISTS assignments_status_idx ON public.assignments(status);
CREATE INDEX IF NOT EXISTS assignments_target_idx ON public.assignments(target_type, target_id);
