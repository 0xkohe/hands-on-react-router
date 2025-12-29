-- Tenant staffs table - links users to tenants with role information
CREATE TABLE IF NOT EXISTS public.tenant_staffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  email text,
  role tenant_role_enum NOT NULL DEFAULT 'member',
  status staff_status_enum NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT tenant_staffs_unique UNIQUE (tenant_id, user_id)
);

-- Enable RLS
ALTER TABLE public.tenant_staffs ENABLE ROW LEVEL SECURITY;

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS tenant_staffs_tenant_id_idx ON public.tenant_staffs(tenant_id);
CREATE INDEX IF NOT EXISTS tenant_staffs_user_id_idx ON public.tenant_staffs(user_id);
CREATE INDEX IF NOT EXISTS tenant_staffs_status_idx ON public.tenant_staffs(status);
