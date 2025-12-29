-- Group members table - many-to-many relationship between groups and staff
CREATE TABLE IF NOT EXISTS public.group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  staff_id uuid NOT NULL REFERENCES public.tenant_staffs(id) ON DELETE CASCADE,
  added_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT group_members_unique UNIQUE (group_id, staff_id)
);

-- Enable RLS
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS group_members_group_id_idx ON public.group_members(group_id);
CREATE INDEX IF NOT EXISTS group_members_staff_id_idx ON public.group_members(staff_id);
