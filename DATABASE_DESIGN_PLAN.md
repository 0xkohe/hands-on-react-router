# Database Design Plan: CloudDriver Job Board Application

## Overview

CloudDriver is a multi-tenant job board/exam platform with three main user roles:
- **Admin**: System-wide management
- **Tenant**: Company/organization with employees
- **User**: Individuals (job seekers/candidates)

## UI Analysis

### Admin Routes
- `admin.tenants` - List/manage tenants (plan, users, status)
- `admin.tenants.$id` - Tenant detail management
- `admin.users` - Cross-tenant user search
- `admin.exam-templates` - Manage exam template library (create, edit, delete)
- `admin.exam-templates.$id.edit` - Edit exam template
- Other admin routes: audit logs, billing, dashboard, support, settings, infrastructure

### Tenant Routes
- `tenant.$tid.members` - Invite, manage, remove team members
- `tenant.$tid.assignments` - Create and manage exam assignments (target, deadline, track progress)
- `tenant.$tid.exams.custom` - Create custom exams for company-specific requirements
- `tenant.$tid.results` - View exam results and analytics
- Other tenant routes: groups, analytics, audit logs, billing, dashboard, support, settings

### User Routes
- `user.results.$id` - View personal exam results with feedback (score, passed/failed checks, points)
- `user.certificates` - Certifications earned
- `user.projects` - Project assignments
- `user.lab.$id` - Lab environment for hands-on practice
- Other user routes: bookmarks, analytics, history, home, resources, notifications, support, settings

## Proposed Table Structure

### 1. Foundation: Users Table

**SQL File Location**: `supabase/schemas/02_tables/users.sql`

**Purpose**: Core user authentication and identity

```sql
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
```

**Key Fields Identified From UI**:
- `id` - From Supabase Auth
- `email` - From user display in admin.users table

---

### 2. Admin Users Table

**SQL File Location**: `supabase/schemas/02_tables/admin_users.sql`

**Purpose**: Track which users have system-wide admin privileges

```sql
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
```

**Key Decision**: Simple marker table to identify admins - clean separation of concerns

---

### 3. Tenants Table (Multi-Tenant Organizations)

**SQL File Location**: `supabase/schemas/02_tables/tenants.sql`

**Purpose**: Represent companies/organizations that contract the platform

```sql
CREATE TABLE IF NOT EXISTS public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  plan text NOT NULL DEFAULT 'starter',
  status text NOT NULL DEFAULT 'active',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS tenants_status_idx ON public.tenants(status);
```

**Form Fields From UI** (`admin.tenants`):
- `name` - Tenant name
- `plan` - Plan level (プロ, エンタープライズ, スターター, etc.)
- `status` - アクティブ, 一時停止, etc.
- `is_active` - Soft delete support

**Additional Fields From List View**:
- Track user count (denormalized via tenant_staffs count or separate stats table)
- Join date (created_at)

---

### 4. Tenant Staffs Table (Organization Members)

**SQL File Location**: `supabase/schemas/02_tables/tenant_staffs.sql`

**Purpose**: Link users to tenants and define their role/status in organization

```sql
CREATE TABLE IF NOT EXISTS public.tenant_staffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  email text,
  role text NOT NULL DEFAULT 'member',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT tenant_staffs_unique UNIQUE (tenant_id, user_id)
);

ALTER TABLE public.tenant_staffs ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS tenant_staffs_tenant_id_idx ON public.tenant_staffs(tenant_id);
CREATE INDEX IF NOT EXISTS tenant_staffs_user_id_idx ON public.tenant_staffs(user_id);
CREATE INDEX IF NOT EXISTS tenant_staffs_status_idx ON public.tenant_staffs(status);
```

**Form Fields From UI** (`tenant.$tid.members`):
- `name` - Member name
- `email` - Member email
- `role` - 管理者 (admin), メンバー (member)
- `status` - アクティブ (active), 招待待ち (pending), etc.
- `created_at` - Join date (加入日)

**Key Decisions**:
- Stores denormalized `name` and `email` for easy display without joins
- `UNIQUE (tenant_id, user_id)` - One user can only have one role per tenant
- Separate from users table to support different invitations/statuses per tenant

---

### 5. Exam Templates Table

**SQL File Location**: `supabase/schemas/02_tables/exam_templates.sql`

**Purpose**: Reusable exam questions/blueprints for admin library

```sql
CREATE TABLE IF NOT EXISTS public.exam_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text,
  category text,
  difficulty text NOT NULL DEFAULT 'beginner',
  author_id uuid NOT NULL REFERENCES public.admin_users(user_id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'draft',
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.exam_templates ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS exam_templates_author_id_idx ON public.exam_templates(author_id);
CREATE INDEX IF NOT EXISTS exam_templates_status_idx ON public.exam_templates(status);
CREATE INDEX IF NOT EXISTS exam_templates_category_idx ON public.exam_templates(category);
```

**Form Fields From UI** (`admin.exam-templates`):
- `title` - Template name (テンプレート名)
- `category` - Category (カテゴリ) - ネットワーク, コンピュート, ストレージ, etc.
- `difficulty` - Difficulty level (難易度) - 初級, 中級, 上級
- `status` - Status (ステータス) - 公開 (public/draft)
- `author_id` - Creator (作成者)
- `description` - Template description

**Key Decision**: Store template metadata only; actual questions stored in separate questions table

---

### 6. Exams Table (Tenant-Specific)

**SQL File Location**: `supabase/schemas/02_tables/exams.sql`

**Purpose**: Exams created by tenants (based on templates or custom)

```sql
CREATE TABLE IF NOT EXISTS public.exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT '',
  description text,
  template_id uuid REFERENCES public.exam_templates(id) ON DELETE SET NULL,
  difficulty text NOT NULL DEFAULT 'beginner',
  duration_minutes integer,
  passing_score integer DEFAULT 70,
  is_private boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL REFERENCES public.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS exams_tenant_id_idx ON public.exams(tenant_id);
CREATE INDEX IF NOT EXISTS exams_template_id_idx ON public.exams(template_id);
```

**Form Fields From UI** (`tenant.$tid.exams.custom` - Create Custom Exam):
- `title` - 試験タイトル (試験タイトル)
- `difficulty` - 難易度 (難易度)
- `description` - 要件定義 (requirements definition)
- `is_private` - Private flag (この試験を非公開にする)
- Implied from list view: duration, passing_score

**Key Decisions**:
- Can reference template_id (for created from template) or be standalone (custom)
- tenant_id ensures multi-tenant isolation
- Stores exam metadata only; questions in separate table

---

### 7. Exam Questions Table

**SQL File Location**: `supabase/schemas/02_tables/exam_questions.sql`

**Purpose**: Individual questions that make up an exam

```sql
CREATE TABLE IF NOT EXISTS public.exam_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question_text text NOT NULL DEFAULT '',
  question_type text NOT NULL DEFAULT 'multiple_choice',
  order_index integer,
  points integer DEFAULT 10,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS exam_questions_exam_id_idx ON public.exam_questions(exam_id);
```

**Key Decision**: Separate table supports flexible question management

---

### 8. Assignments Table

**SQL File Location**: `supabase/schemas/02_tables/assignments.sql`

**Purpose**: Exam assignments given to team members/groups

```sql
CREATE TABLE IF NOT EXISTS public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  assigned_by uuid NOT NULL REFERENCES public.users(id) ON DELETE SET NULL,
  target_type text NOT NULL DEFAULT 'group',
  target_id uuid,
  deadline date,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS assignments_tenant_id_idx ON public.assignments(tenant_id);
CREATE INDEX IF NOT EXISTS assignments_exam_id_idx ON public.assignments(exam_id);
CREATE INDEX IF NOT EXISTS assignments_deadline_idx ON public.assignments(deadline);
```

**Form Fields From UI** (`tenant.$tid.assignments`):
- `exam_id` - Which exam (プロジェクト)
- `target_type`/`target_id` - Target (対象者) - 全メンバー, specific group, etc.
- `deadline` - Deadline (期限)
- Status (ステータス) - 進行中, 完了

**Key Decisions**:
- Flexible target system: can assign to groups, individuals, or all members
- Denormalized stats (pass_rate) calculated from exam_results on query

---

### 9. Exam Results Table

**SQL File Location**: `supabase/schemas/02_tables/exam_results.sql`

**Purpose**: Track user exam attempts and scores

```sql
CREATE TABLE IF NOT EXISTS public.exam_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  assignment_id uuid REFERENCES public.assignments(id) ON DELETE SET NULL,
  score integer NOT NULL,
  max_score integer NOT NULL,
  percentage_score integer GENERATED ALWAYS AS (ROUND(100.0 * score / max_score)) STORED,
  passed boolean GENERATED ALWAYS AS (percentage_score >= (SELECT passing_score FROM exams WHERE id = exam_id)) STORED,
  time_spent_seconds integer,
  attempted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS exam_results_exam_id_idx ON public.exam_results(exam_id);
CREATE INDEX IF NOT EXISTS exam_results_user_id_idx ON public.exam_results(user_id);
CREATE INDEX IF NOT EXISTS exam_results_assignment_id_idx ON public.exam_results(assignment_id);
```

**Form Fields From UI** (`user.results.$id`):
- `score` - Total score (e.g., 870 from "Points Earned")
- `max_score` - Maximum possible score (1000 in example)
- `percentage_score` - Percentage (87%)
- `passed` - Pass/fail status
- `time_spent_seconds` - Completion time (1h 23m = 5000 seconds)
- `completed_at` - When completed
- Detail: Pass/fail count (13/15 passed checks = number of questions)

**Key Decisions**:
- Using GENERATED ALWAYS AS for computed columns (percentage, passed)
- Tracks detailed timing information
- Links to both exam and user for easy querying

---

### 10. Exam Answers Table (Question-Level Results)

**SQL File Location**: `supabase/schemas/02_tables/exam_answers.sql`

**Purpose**: User's answer to each individual question

```sql
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

ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS exam_answers_exam_result_id_idx ON public.exam_answers(exam_result_id);
CREATE INDEX IF NOT EXISTS exam_answers_question_id_idx ON public.exam_answers(question_id);
```

**Form Fields From UI** (`user.results.$id` feedback section):
- Question text and feedback for each question
- Pass/fail indicator (✓/✗)
- Detailed feedback message

**Key Decision**: Enables detailed per-question feedback and analytics

---

### 11. Groups Table

**SQL File Location**: `supabase/schemas/02_tables/groups.sql`

**Purpose**: Organize team members into groups (for targeting assignments)

```sql
CREATE TABLE IF NOT EXISTS public.groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  description text,
  created_by uuid NOT NULL REFERENCES public.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS groups_tenant_id_idx ON public.groups(tenant_id);
```

**Inferred From UI** (`tenant.$tid.groups` route):
- Groups for targeting assignments (e.g., "開発部", "営業部")

---

### 12. Group Members Table

**SQL File Location**: `supabase/schemas/02_tables/group_members.sql`

**Purpose**: Association between groups and team members

```sql
CREATE TABLE IF NOT EXISTS public.group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  staff_id uuid NOT NULL REFERENCES public.tenant_staffs(id) ON DELETE CASCADE,
  added_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT group_members_unique UNIQUE (group_id, staff_id)
);

ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS group_members_group_id_idx ON public.group_members(group_id);
CREATE INDEX IF NOT EXISTS group_members_staff_id_idx ON public.group_members(staff_id);
```

**Key Decision**: Many-to-many junction table for flexible group management

---

## RLS (Row Level Security) Policies

### Admin Access Pattern
- Full access to all tables
- Policy: `(auth.jwt() ->> 'role') = 'admin'`

### Tenant Access Pattern
- Access only own tenant data and associated records
- Policy: Can view/manage records where `tenant_id` matches their tenant

### User Access Pattern
- Access only own records
- Can view:
  - Own exam results
  - Own assignments (relevant exams)
  - Own certificates/achievements
- Policy: `user_id = auth.uid()`

---

## Relationships Map

```
auth.users (Supabase)
    ↓
public.users ─────────────────────────────────────────┐
    ↓                                                   │
    ├─→ admin_users (for admin role checking)          │
    │                                                   │
    ├─→ exam_templates ───→ exams ────→ assignments    │
    │    (created_by)        (created_by) (assigned_by)│
    │                             ↓                    │
    │                    exam_results ←────────────────┘
    │                             ↓
    │                    exam_answers
    │
    └─→ tenant_staffs ──→ tenants
             ↓
         group_members
             ↓
         groups
```

---

## Indexes Summary

| Table | Column | Reason |
|-------|--------|--------|
| users | email | Login lookup |
| exam_templates | author_id | Filter by author |
| exam_templates | status | Filter by publish status |
| exam_templates | category | Filtering in list view |
| exams | tenant_id | Multi-tenant isolation |
| exams | template_id | Join with templates |
| assignments | tenant_id | Multi-tenant filtering |
| assignments | exam_id | Filtering assignments |
| assignments | deadline | Sorting by deadline |
| exam_results | exam_id | Find all results for exam |
| exam_results | user_id | Find user's exam history |
| exam_results | assignment_id | Link to assignment |
| exam_answers | exam_result_id | Fetch answers for result |
| exam_answers | question_id | Validation/analytics |
| groups | tenant_id | Multi-tenant filtering |
| group_members | group_id | Fetch members |
| group_members | staff_id | Find user's groups |
| tenant_staffs | tenant_id | Multi-tenant member lookup |
| tenant_staffs | user_id | Find user's tenants |
| tenant_staffs | status | Filter by status |
| tenants | status | Filter active tenants |

---

## Alternative Approaches Considered

### 1. Storing Template Questions vs. Separate Table
**Considered**: Store questions as JSON array in exam_templates table
**Chosen**: Separate exam_questions table
**Reason**: Allows flexible question management, better for large exams, easier to query per-question stats

### 2. User Profile vs. Flat Users Table
**Considered**: Separate profiles table with biographical data
**Chosen**: Keep minimal in users table for now
**Reason**: Can be added later if needed; users table serves as auth bridge. Add profile fields as needed.

### 3. Exam Status vs. Separate States
**Considered**: Separate draft, published, archived tables
**Chosen**: Single exams table with status column
**Reason**: Simpler schema, easier to manage lifecycle, status-based filtering is sufficient

### 4. Assignment Targeting Strategy
**Considered**: 
   - Separate tables for individual assignments, group assignments, broadcast assignments
   - Enum with target_type and target_id

**Chosen**: Flexible target_type + target_id approach
**Reason**: Allows "all members", "specific group", or "individual" without schema duplication

### 5. Exam Results Storage
**Considered**: 
   - Store as JSON blob per exam
   - Detailed row per answer

**Chosen**: Separate exam_results + exam_answers tables
**Reason**: Enables detailed per-question feedback, analytics, and historical tracking

---

## Questions for Review

1. **Custom Fields**: Should tenants be able to add custom fields to team members beyond name, email, role?
   - Current design: Fixed schema, can add later
   
2. **Lab Environments** (`user.lab.$id`): Should we track lab instances, states, resources?
   - Not in current plan - may need separate tables for lab infrastructure
   
3. **Certificates** (`user.certificates`): Should we track badges and certifications earned?
   - Could be separate tables: certificates, user_certificates
   
4. **Bookmarks** (`user.bookmarks`): Should we track user-bookmarked content?
   - Could be simple bookmark_target_type + bookmark_target_id approach
   
5. **Notifications**: Should we track notification preferences and history?
   - Not in current plan - may need separate tables

6. **Audit Logging**: Routes mention audit logs - should we create audit tables?
   - Consider PostgreSQL audit trigger pattern or separate audit tables
   
7. **Billing**: Pricing plans and billing data?
   - Could be separate billing_plans, billing_invoices tables
   
8. **File Uploads**: Do exams support file uploads or images in questions?
   - May need storage_files table to track uploaded assets

---

## Implementation Checklist

- [ ] Create SQL files in appropriate `supabase/schemas/` directories
- [ ] Create enums for status, role, difficulty fields
- [ ] Create all tables with standard fields (id, timestamps)
- [ ] Enable RLS on all tables
- [ ] Add indexes for foreign keys and common query columns
- [ ] Run `supabase db diff` to validate schema
- [ ] Fix any errors from diff command
- [ ] Run migrations
- [ ] Regenerate TypeScript types
- [ ] Test access patterns for each role
