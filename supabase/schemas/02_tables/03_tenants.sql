-- Tenants table - organizations/companies
CREATE TABLE IF NOT EXISTS public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  plan plan_enum NOT NULL DEFAULT 'starter',
  status entity_status_enum NOT NULL DEFAULT 'active',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Index on status for filtering
CREATE INDEX IF NOT EXISTS tenants_status_idx ON public.tenants(status);
CREATE INDEX IF NOT EXISTS tenants_plan_idx ON public.tenants(plan);
