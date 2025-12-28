---
description: "DB Design Mode"
name: "DB Design Mode"
tools: ['execute', 'read', 'edit', 'search', 'web/fetch', 'agent', 'todo']
model: Claude Sonnet 4.5
---

# Database Design Guide

This file provides guidance for designing database tables from frontend UI implementation in this React Router v7 application with Supabase.

## ⚠️ Critical Rules

**BEFORE YOU START:**

1. **NEVER create or modify database tables without a plan**
2. **ALWAYS create a detailed design plan document first**
3. **ALWAYS get explicit user approval before implementation**
4. **Document all design decisions and alternatives**

See [Database Design Planning Process](#database-design-planning-process) section for the complete workflow.

## UI-Driven Database Design Methodology

### Core Principle: Start with Insert/Create Screens

**IMPORTANT**: The most effective way to design database tables is to analyze the frontend UI screens, especially Insert/Create forms. These screens reveal the exact data structure needed for your application.

### 1. Analyze Insert/Create Screens First

**Why Start with Insert/Create Screens:**

- **Direct mapping**: Form inputs directly correspond to table columns
- **Complete data structure**: These screens show ALL fields that need to be stored
- **Constraint discovery**: Required fields indicate NOT NULL constraints
- **Type hints**: Input types reveal appropriate database data types
- **Relationship identification**: Dropdowns and selectors indicate foreign keys
- **Validation rules**: Frontend validation hints at database constraints

**Examples from Current Codebase:**

| Route | Purpose | Table Design |
|-------|---------|--------------|
| `tenant.exams.custom/` | Create custom exam | → `exams` table |
| `tenant.assignments/` | Create assignment | → `assignments` table |
| `tenant.members/` | Add member | → `tenant_members`, `users` tables |
| `admin.tenants/` | Create tenant | → `tenants` table |
| `admin.exams/` | Create exam | → `exams` table |
| `admin.users/` | Create user | → `users` table |

### 2. Extract Table Structure from Forms

**Step-by-Step Process:**

#### Step 1: Identify All Form Fields

Look at each input field in Insert/Create screens and list them.

#### Step 2: Map Form Fields to Database Columns

| Form Input Type | Database Type | Example |
|----------------|---------------|---------|
| Text input (short) | `VARCHAR(255)` | Name, email, title |
| Text input (long) | `TEXT` | Description, notes, content |
| Number input | `INTEGER`, `BIGINT`, `DECIMAL` | Age, count, price |
| Date picker | `DATE` | Birth date, deadline |
| DateTime picker | `TIMESTAMP WITH TIME ZONE` | Created at, updated at |
| Boolean checkbox | `BOOLEAN` | Is active, is published |
| Select/Dropdown (fixed options) | `ENUM` or `VARCHAR` | Status, role, category |
| Select/Dropdown (from DB) | Foreign key `UUID` or `INTEGER` | User ID, tenant ID |
| File upload | `VARCHAR(500)` or `TEXT` | File URL/path |
| Multi-select | Junction table needed | Tags, categories |
| Rich text editor | `TEXT` or `JSONB` | Article content |
| JSON editor | `JSONB` | Configuration, metadata |

#### Step 3: Determine Constraints

| Frontend Validation | Database Constraint |
|-------------------|-------------------|
| Required field | `NOT NULL` |
| Unique field | `UNIQUE` |
| Min/Max length | `CHECK (length(column) >= min AND length(column) <= max)` |
| Min/Max value | `CHECK (column >= min AND column <= max)` |
| Default value | `DEFAULT value` |
| Email format | `CHECK (column ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')` |

#### Step 4: Identify Relationships

| UI Element | Database Relationship |
|-----------|---------------------|
| User selector | Foreign key to `users` table |
| Organization/Tenant selector | Foreign key to `tenants` table |
| Single select (from DB) | Foreign key `ON DELETE CASCADE/SET NULL` |
| Multi-select (from DB) | Junction table with two foreign keys |
| Parent-child relationship | Self-referencing foreign key |

**Example: Multi-select requires junction table**
```
UI: Select multiple categories for a post

Tables needed:
- posts (id, title, content, ...)
- categories (id, name, ...)
- post_categories (post_id, category_id) -- Junction table
```

### 3. Analyze List/Index Screens

**What to Look For:**

- **Display columns** → These are important queryable fields, need proper indexing
- **Sort options** → Fields that need indexes for performance
- **Filter options** → Fields that need indexes
- **Search functionality** → Fields that need full-text search indexes or GIN indexes

**Example:**
```
If tenant.results/ page shows a table with:
- Sortable by: date, score, status
- Filterable by: user, exam_type, status
- Searchable by: user_name, exam_title

Then the results table needs:
- Indexes on: date, score, status, user_id, exam_type
- Consider full-text search index on user_name and exam_title
```

### 4. Review Detail/Show Screens

**Purpose:**

- **Identify relationships**: 1-to-many, many-to-many relationships
- **Nested data**: Related records that need foreign keys
- **Calculated fields**: May need database views or functions
- **Aggregations**: May need materialized views for performance

**Example:**
```
user.exams.$id.report/ shows:
- Exam details (from exams table)
- User answers (1-to-many: exam_answers table)
- Score breakdown (calculated field or view)
- Time spent (calculated from timestamps)
```

### 5. Consider Application Roles and Access Control

**Based on Current Application Structure:**

#### Admin Role (`admin.*` routes)
- **Manages**: Tenants, users, exams, billing, infrastructure
- **Access**: Full access to all tables
- **RLS Policy**: `role = 'admin'`

#### Tenant Role (`tenant.*` routes)
- **Manages**: Members, assignments, custom exams, results
- **Access**: Own tenant data and associated records
- **RLS Policy**: `tenant_id = auth.jwt() ->> 'tenant_id'`

#### User Role (`user.*` routes)
- **Accesses**: Own exams, certificates, badges, activity, profile
- **Access**: User-owned records only
- **RLS Policy**: `user_id = auth.uid()`

**RLS Policy Design Pattern:**

```sql
-- Example for tenant-scoped table
CREATE POLICY "Tenants can access own data"
  ON table_name
  FOR ALL
  USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Example for user-scoped table
CREATE POLICY "Users can access own data"
  ON table_name
  FOR ALL
  USING (user_id = auth.uid());

-- Example for admin access
CREATE POLICY "Admins have full access"
  ON table_name
  FOR ALL
  USING ((auth.jwt() ->> 'role') = 'admin');
```

## Database Configuration

This application uses **Supabase** with:
- TypeScript-generated types for full type safety
- Row Level Security (RLS) for access control
- Client-side database operations (SPA mode)

## Data Fetching with Supabase

- Use the typed Supabase client from `~/lib/supabaseClient`
- All database operations must be done client-side in components or custom hooks
- Use `useAuth()` from `~/contexts/AuthContext` to get the current user
- Create custom hooks in the component directory (e.g., `app/routes/user.profile/hooks/`) for reusable data operations

## Database Schema and Types

**IMPORTANT**: When accessing or querying the database, always refer to `app/database.types.ts` for:

- Table schemas and column definitions
- Type-safe database queries
- Available database enums and their values
- Foreign key relationships
- Column constraints and data types

The `database.types.ts` file is generated from the Supabase schema and provides full TypeScript type safety for all database operations. Always import and use these types when working with database queries to ensure type correctness and avoid runtime errors.

**Example**:
```typescript
import type { Database } from '~/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
```

## Supabase Schema Management

Database schema is managed through modular SQL files in the `supabase/schemas/` directory. The structure is organized by execution order:

### Directory Structure

```
supabase/schemas/
├── 00_setup/          # Database extensions and initial configuration
│   └── extensions.sql # Enable pgcrypto, uuid-ossp, etc.
├── 01_types/          # Custom PostgreSQL types and enums
│   └── enums.sql     # CREATE TYPE statements for enums
├── 02_tables/         # Table definitions
│   ├── users.sql     # Users table
│   ├── tenants.sql   # Tenants/organizations table
│   ├── profiles.sql  # User profiles
│   ├── exams.sql     # Exams table
│   ├── assignments.sql # Assignments table
│   └── ...           # Other tables
├── 03_functions/      # Stored procedures and database functions
│   └── helpers.sql   # Utility functions
├── 04_policies/       # Row Level Security (RLS) policies
│   ├── users_policies.sql
│   ├── tenants_policies.sql
│   └── ...           # Policies for each table
├── 05_views/          # Database views for complex queries
│   └── analytics.sql # Views for reporting
├── 06_triggers/       # Automated database triggers
│   └── timestamps.sql # Auto-update timestamps
└── 07_indexes/        # Performance optimization indexes
    └── performance.sql # CREATE INDEX statements
```

### Schema Organization Guidelines

**00_setup/** - Foundation
- Database extensions (uuid-ossp, pgcrypto, pg_trgm for full-text search)
- Initial configuration
- Run first

**01_types/** - Enums and Custom Types
- Define all ENUM types here
- Custom composite types
- Run before tables

**02_tables/** - Core Data Structure
- One file per table or related group of tables
- Include primary keys, foreign keys, constraints
- Order files by dependencies (parent tables before child tables)

**03_functions/** - Business Logic
- Stored procedures
- Helper functions
- Complex calculations

**04_policies/** - Security
- Row Level Security policies for each table
- One file per table recommended
- Define policies for admin, tenant, and user roles

**05_views/** - Query Optimization
- Materialized views for complex queries
- Regular views for commonly used joins
- Reporting views

**06_triggers/** - Automation
- Auto-update timestamps (updated_at)
- Audit logging
- Data validation

**07_indexes/** - Performance
- Single-column indexes for foreign keys
- Composite indexes for common query patterns
- Full-text search indexes (GIN)
- Run last

### When Modifying the Database Schema

1. **Update the appropriate SQL file** in the corresponding directory
2. **Run migrations** via Supabase CLI:
   ```bash
   supabase db reset --local
   # or
   supabase migration new your_migration_name
   ```
3. **Regenerate TypeScript types**:
   ```bash
   supabase gen types typescript --local > app/database.types.ts
   ```

## Common Database Patterns

### Standard Table Template

```sql
-- 02_tables/table_name.sql
CREATE TABLE IF NOT EXISTS public.table_name (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign Keys
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,

  -- Data Fields
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft',

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.table_name ENABLE ROW LEVEL SECURITY;
```

### Junction Table Template (Many-to-Many)

```sql
-- 02_tables/table_a_table_b.sql
CREATE TABLE IF NOT EXISTS public.table_a_table_b (
  -- Composite Primary Key
  table_a_id UUID REFERENCES public.table_a(id) ON DELETE CASCADE,
  table_b_id UUID REFERENCES public.table_b(id) ON DELETE CASCADE,

  -- Optional metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  PRIMARY KEY (table_a_id, table_b_id)
);

-- Enable RLS
ALTER TABLE public.table_a_table_b ENABLE ROW LEVEL SECURITY;
```

### Auto-Update Timestamp Trigger

```sql
-- 06_triggers/update_timestamp.sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER update_table_name_timestamp
  BEFORE UPDATE ON public.table_name
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Foundation Tables (Base Structure)

**IMPORTANT**: These are the fundamental tables that form the foundation of most applications with Supabase. Start with these base tables before creating feature-specific tables.

### 1. Users Table (Core Authentication)

The `users` table is the foundation that links to Supabase Auth. This table extends the built-in `auth.users` table with application-specific user data.

```sql
-- 02_tables/users.sql
CREATE TABLE IF NOT EXISTS public.users (
  -- Primary Key (references Supabase Auth)
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Basic Information
  email text,

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Add index on email for lookups
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
```

**Key Points:**
- `id` references `auth.users(id)` - Links to Supabase authentication
- `ON DELETE CASCADE` - Automatically removes user data when auth user is deleted
- `timestamptz` with UTC timezone for consistent timestamp handling
- Add additional user profile fields as needed (name, avatar_url, etc.)

### 2. Admin Users Table (System Administrators)

The `admin_users` table identifies which users have system-wide administrative privileges.

```sql
-- 02_tables/admin_users.sql
CREATE TABLE IF NOT EXISTS public.admin_users (
  -- Primary Key
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign Key to Users
  user_id uuid UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Only admins can view admin_users table
CREATE POLICY "Admins can view admin_users"
  ON public.admin_users
  FOR SELECT
  USING (
    auth.uid() IN (SELECT user_id FROM public.admin_users)
  );
```

**Key Points:**
- `user_id` has `UNIQUE` constraint - One user can only be admin once
- Simple structure - Just links user_id to mark them as admin
- RLS policy ensures only existing admins can see who else is admin

### 3. Tenants Table (Multi-Tenant Organizations)

**Use this if your application is multi-tenant** (multiple organizations/companies using the same system).

```sql
-- 02_tables/tenants.sql
CREATE TABLE IF NOT EXISTS public.tenants (
  -- Primary Key
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Tenant Information
  name text NOT NULL DEFAULT '',

  -- Status
  is_active boolean NOT NULL DEFAULT true,

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own tenant
CREATE POLICY "Users can view own tenant"
  ON public.tenants
  FOR SELECT
  USING (
    id IN (
      SELECT tenant_id FROM public.tenant_staffs
      WHERE user_id = auth.uid()
    )
  );
```

**Key Points:**
- `is_active` - Allows soft disabling of tenants
- Add more fields based on UI (company_name, domain, plan_type, etc.)
- RLS ensures users only see their own organization

### 4. Tenant Staffs Table (Organization Members)

Links users to tenants and defines their role within the organization.

```sql
-- 01_types/enums.sql (Create enum first)
CREATE TYPE tenant_role_enum AS ENUM ('owner', 'admin', 'staff');

-- 02_tables/tenant_staffs.sql
CREATE TABLE IF NOT EXISTS public.tenant_staffs (
  -- Primary Key
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign Keys
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Staff Information
  name text NOT NULL DEFAULT '',
  role tenant_role_enum NOT NULL DEFAULT 'staff',

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),

  -- Ensure one user can only have one role per tenant
  CONSTRAINT tenant_staffs_unique UNIQUE (tenant_id, user_id)
);

-- Enable RLS
ALTER TABLE public.tenant_staffs ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view members of their tenant
CREATE POLICY "Users can view own tenant staff"
  ON public.tenant_staffs
  FOR SELECT
  USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_staffs
      WHERE user_id = auth.uid()
    )
  );

-- Index for common queries
CREATE INDEX IF NOT EXISTS tenant_staffs_tenant_id_idx ON public.tenant_staffs(tenant_id);
CREATE INDEX IF NOT EXISTS tenant_staffs_user_id_idx ON public.tenant_staffs(user_id);
```

**Key Points:**
- `UNIQUE (tenant_id, user_id)` - One user can only be in a tenant once
- `role` enum - Defines permission level within the organization
- Indexes on foreign keys for query performance
- RLS ensures users only see members of their own tenant

### Foundation Table Structure Summary

```
Database Foundation:
├── auth.users (Supabase managed)
│
├── public.users ──────────┐
│   └── Links to auth.users│
│                           │
├── public.admin_users ─────┤
│   └── References users    │
│                           │
└── public.tenants          │
    │                       │
    └── public.tenant_staffs┤
        ├── References tenants
        └── References users
```

**Relationship Flow:**
1. User signs up → Record in `auth.users` (Supabase Auth)
2. Create corresponding record in `public.users`
3. If admin → Add record to `admin_users`
4. If multi-tenant → Create/join tenant via `tenant_staffs`

**When to Use Each Table:**

| Table | Use Case |
|-------|----------|
| `users` | **Always required** - Every application needs this |
| `admin_users` | **Use if** you have system administrators who manage the entire platform |
| `tenants` | **Use if** your app is multi-tenant (multiple organizations) |
| `tenant_staffs` | **Use with** `tenants` - Links users to their organizations |

**Single-Tenant Alternative:**
If your application is **not multi-tenant** (single organization or personal use):
- Skip `tenants` and `tenant_staffs` tables
- Add role directly to `users` table: `role text DEFAULT 'user'`
- Simplify RLS policies to user-based instead of tenant-based

## Best Practices

### 0. Never Skip the Planning Phase
- **ALWAYS create a design plan document** before implementing tables
- **ALWAYS get user approval** before creating or modifying tables
- Document design decisions and alternatives considered
- Address any uncertainties before implementation

### 1. Always Start with UI Analysis
- Review all Insert/Create screens before creating tables
- Map form fields to database columns systematically
- Consider all user roles and their access patterns

### 2. Use Consistent Naming
- Table names: plural, lowercase, underscore_separated (e.g., `exam_results`)
- Column names: singular, lowercase, underscore_separated (e.g., `user_id`)
- Foreign keys: `{referenced_table_singular}_id` (e.g., `tenant_id`)

### 3. Always Enable RLS
- Every table should have RLS enabled
- Define policies for each role (admin, tenant, user)
- Test policies thoroughly

### 4. Include Standard Fields
- `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- `created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`
- `updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`
- `deleted_at TIMESTAMP WITH TIME ZONE` (if using soft deletes)

### 5. Optimize for Queries
- Add indexes for foreign keys
- Add indexes for commonly filtered/sorted columns
- Use composite indexes for multi-column queries
- Monitor query performance and add indexes as needed

### 6. Document Your Schema
- Add comments to tables and columns
- Document complex relationships
- Explain business logic in function comments

## Database Design Planning Process

**CRITICAL**: Never create or modify database tables without first creating a plan and getting user approval.

### Planning Workflow

1. **Analyze UI Requirements**
   - Review all relevant UI screens (Insert/Create, List, Detail)
   - Identify all form fields and their types
   - Note relationships between entities
   - Consider user roles and access patterns

2. **Create Design Plan Document**

   Create a detailed plan file documenting:

   ```markdown
   # Database Design Plan: [Feature Name]

   ## UI Analysis

   ### Screens Analyzed
   - [Route Path] - [Screen Purpose]
   - List all relevant screens

   ### Form Fields Identified
   | Field Name | Input Type | Database Type | Constraints |
   |------------|------------|---------------|-------------|
   | title | text input | VARCHAR(255) | NOT NULL |
   | description | textarea | TEXT | NULL |
   | ...

   ## Proposed Table Structure

   ### Table: [table_name]

   ```sql
   CREATE TABLE public.[table_name] (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     -- columns...
   );
   ```

   **Purpose**: [Explain what this table stores]

   **Key Decisions**:
   - Why certain data types were chosen
   - Foreign key relationships
   - Unique constraints rationale

   ### RLS Policies

   ```sql
   -- Policy definitions
   ```

   **Access Control**:
   - Admin: [access level]
   - Tenant: [access level]
   - User: [access level]

   ## Relationships

   - [table_a] → [table_b]: [relationship type and reason]

   ## Indexes

   - [column_name]: [reason for index]

   ## Alternative Approaches Considered

   - [Alternative 1]: [pros/cons, why not chosen]
   - [Alternative 2]: [pros/cons, why not chosen]

   ## Questions for Review

   - [Any uncertainties or decisions that need user input]
   ```

3. **Present Plan to User**
   - Show the complete plan document
   - Explain design decisions
   - Highlight any areas of uncertainty
   - Ask for approval or feedback

4. **Wait for User Approval**
   - **DO NOT proceed** without explicit user approval
   - Address any user concerns or questions
   - Revise plan based on feedback

5. **Implementation (Only After Approval)**
   - Create SQL files in `supabase/schemas/` directories
   - Implement tables, policies, indexes as planned
   - Run migrations
   - Regenerate TypeScript types

### Planning Checklist

Before presenting a plan to the user, ensure:

- [ ] All UI screens have been analyzed
- [ ] All form fields are mapped to database columns
- [ ] Data types are appropriate and justified
- [ ] Relationships between tables are clear
- [ ] RLS policies are defined for each role
- [ ] Indexes are planned for performance
- [ ] Alternative approaches have been considered
- [ ] Foundation tables (users, tenants, etc.) are included if needed
- [ ] SQL syntax is correct and follows Supabase conventions

## Workflow Summary

1. **Start with foundation tables** (users, admin_users, tenants, tenant_staffs)
2. **Analyze UI screens** (especially Insert/Create forms)
3. **List all form fields** and their types
4. **Design table structure** based on form analysis
5. **Identify relationships** between tables
6. **📋 CREATE DESIGN PLAN DOCUMENT** - Document all design decisions
7. **✋ GET USER APPROVAL** - Wait for explicit approval before proceeding
8. **Create SQL files** in appropriate `supabase/schemas/` directories (only after approval)
9. **Define RLS policies** based on user roles
10. **Add indexes** for performance
11. **Run migrations** and regenerate types
12. **Test access patterns** for each role

**Remember**: Steps 8-12 should ONLY be executed after receiving user approval in step 7.
