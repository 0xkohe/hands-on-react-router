create type "public"."assignment_status_enum" as enum ('active', 'completed', 'archived');

create type "public"."assignment_target_type_enum" as enum ('all', 'group', 'individual');

create type "public"."difficulty_enum" as enum ('beginner', 'intermediate', 'advanced');

create type "public"."entity_status_enum" as enum ('active', 'inactive', 'suspended');

create type "public"."exam_status_enum" as enum ('draft', 'published', 'archived');

create type "public"."plan_enum" as enum ('starter', 'professional', 'enterprise');

create type "public"."question_type_enum" as enum ('multiple_choice', 'short_answer', 'essay', 'true_false');

create type "public"."staff_status_enum" as enum ('active', 'pending', 'inactive');

create type "public"."tenant_role_enum" as enum ('owner', 'admin', 'member');


  create table "public"."admin_users" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."admin_users" enable row level security;


  create table "public"."assignments" (
    "id" uuid not null default gen_random_uuid(),
    "tenant_id" uuid not null,
    "exam_id" uuid not null,
    "assigned_by" uuid,
    "target_type" public.assignment_target_type_enum not null default 'group'::public.assignment_target_type_enum,
    "target_id" uuid,
    "deadline" date,
    "status" public.assignment_status_enum not null default 'active'::public.assignment_status_enum,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."assignments" enable row level security;


  create table "public"."exam_answers" (
    "id" uuid not null default gen_random_uuid(),
    "exam_result_id" uuid not null,
    "question_id" uuid not null,
    "user_answer" text,
    "is_correct" boolean not null default false,
    "points_earned" integer default 0,
    "feedback" text,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."exam_answers" enable row level security;


  create table "public"."exam_questions" (
    "id" uuid not null default gen_random_uuid(),
    "exam_id" uuid not null,
    "question_text" text not null default ''::text,
    "question_type" public.question_type_enum not null default 'multiple_choice'::public.question_type_enum,
    "order_index" integer,
    "points" integer default 10,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."exam_questions" enable row level security;


  create table "public"."exam_results" (
    "id" uuid not null default gen_random_uuid(),
    "exam_id" uuid not null,
    "user_id" uuid not null,
    "assignment_id" uuid,
    "score" integer not null,
    "max_score" integer not null,
    "percentage_score" integer generated always as (round(((100.0 * (score)::numeric) / (max_score)::numeric))) stored,
    "time_spent_seconds" integer,
    "attempted_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."exam_results" enable row level security;


  create table "public"."exam_templates" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null default ''::text,
    "description" text,
    "category" text,
    "difficulty" public.difficulty_enum not null default 'beginner'::public.difficulty_enum,
    "author_id" uuid,
    "status" public.exam_status_enum not null default 'draft'::public.exam_status_enum,
    "is_public" boolean not null default false,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."exam_templates" enable row level security;


  create table "public"."exams" (
    "id" uuid not null default gen_random_uuid(),
    "tenant_id" uuid not null,
    "title" text not null default ''::text,
    "description" text,
    "template_id" uuid,
    "difficulty" public.difficulty_enum not null default 'beginner'::public.difficulty_enum,
    "duration_minutes" integer,
    "passing_score" integer default 70,
    "is_private" boolean not null default false,
    "created_by" uuid,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."exams" enable row level security;


  create table "public"."group_members" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid not null,
    "staff_id" uuid not null,
    "added_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."group_members" enable row level security;


  create table "public"."groups" (
    "id" uuid not null default gen_random_uuid(),
    "tenant_id" uuid not null,
    "name" text not null default ''::text,
    "description" text,
    "created_by" uuid,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."groups" enable row level security;


  create table "public"."tenant_staffs" (
    "id" uuid not null default gen_random_uuid(),
    "tenant_id" uuid not null,
    "user_id" uuid not null,
    "name" text not null default ''::text,
    "email" text,
    "role" public.tenant_role_enum not null default 'member'::public.tenant_role_enum,
    "status" public.staff_status_enum not null default 'active'::public.staff_status_enum,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."tenant_staffs" enable row level security;


  create table "public"."tenants" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null default ''::text,
    "plan" public.plan_enum not null default 'starter'::public.plan_enum,
    "status" public.entity_status_enum not null default 'active'::public.entity_status_enum,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."tenants" enable row level security;


  create table "public"."users" (
    "id" uuid not null,
    "email" text,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX admin_users_pkey ON public.admin_users USING btree (id);

CREATE UNIQUE INDEX admin_users_user_id_key ON public.admin_users USING btree (user_id);

CREATE INDEX assignments_deadline_idx ON public.assignments USING btree (deadline);

CREATE INDEX assignments_exam_id_idx ON public.assignments USING btree (exam_id);

CREATE UNIQUE INDEX assignments_pkey ON public.assignments USING btree (id);

CREATE INDEX assignments_status_idx ON public.assignments USING btree (status);

CREATE INDEX assignments_target_idx ON public.assignments USING btree (target_type, target_id);

CREATE INDEX assignments_tenant_id_idx ON public.assignments USING btree (tenant_id);

CREATE INDEX exam_answers_exam_result_id_idx ON public.exam_answers USING btree (exam_result_id);

CREATE UNIQUE INDEX exam_answers_pkey ON public.exam_answers USING btree (id);

CREATE INDEX exam_answers_question_id_idx ON public.exam_answers USING btree (question_id);

CREATE INDEX exam_questions_exam_id_idx ON public.exam_questions USING btree (exam_id);

CREATE INDEX exam_questions_order_idx ON public.exam_questions USING btree (exam_id, order_index);

CREATE UNIQUE INDEX exam_questions_pkey ON public.exam_questions USING btree (id);

CREATE INDEX exam_results_assignment_id_idx ON public.exam_results USING btree (assignment_id);

CREATE INDEX exam_results_completed_at_idx ON public.exam_results USING btree (completed_at);

CREATE INDEX exam_results_exam_id_idx ON public.exam_results USING btree (exam_id);

CREATE UNIQUE INDEX exam_results_pkey ON public.exam_results USING btree (id);

CREATE INDEX exam_results_user_id_idx ON public.exam_results USING btree (user_id);

CREATE INDEX exam_templates_author_id_idx ON public.exam_templates USING btree (author_id);

CREATE INDEX exam_templates_category_idx ON public.exam_templates USING btree (category);

CREATE INDEX exam_templates_difficulty_idx ON public.exam_templates USING btree (difficulty);

CREATE UNIQUE INDEX exam_templates_pkey ON public.exam_templates USING btree (id);

CREATE INDEX exam_templates_status_idx ON public.exam_templates USING btree (status);

CREATE INDEX exams_created_by_idx ON public.exams USING btree (created_by);

CREATE UNIQUE INDEX exams_pkey ON public.exams USING btree (id);

CREATE INDEX exams_template_id_idx ON public.exams USING btree (template_id);

CREATE INDEX exams_tenant_id_idx ON public.exams USING btree (tenant_id);

CREATE INDEX group_members_group_id_idx ON public.group_members USING btree (group_id);

CREATE UNIQUE INDEX group_members_pkey ON public.group_members USING btree (id);

CREATE INDEX group_members_staff_id_idx ON public.group_members USING btree (staff_id);

CREATE UNIQUE INDEX group_members_unique ON public.group_members USING btree (group_id, staff_id);

CREATE UNIQUE INDEX groups_pkey ON public.groups USING btree (id);

CREATE INDEX groups_tenant_id_idx ON public.groups USING btree (tenant_id);

CREATE UNIQUE INDEX tenant_staffs_pkey ON public.tenant_staffs USING btree (id);

CREATE INDEX tenant_staffs_status_idx ON public.tenant_staffs USING btree (status);

CREATE INDEX tenant_staffs_tenant_id_idx ON public.tenant_staffs USING btree (tenant_id);

CREATE UNIQUE INDEX tenant_staffs_unique ON public.tenant_staffs USING btree (tenant_id, user_id);

CREATE INDEX tenant_staffs_user_id_idx ON public.tenant_staffs USING btree (user_id);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (id);

CREATE INDEX tenants_plan_idx ON public.tenants USING btree (plan);

CREATE INDEX tenants_status_idx ON public.tenants USING btree (status);

CREATE INDEX users_email_idx ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."admin_users" add constraint "admin_users_pkey" PRIMARY KEY using index "admin_users_pkey";

alter table "public"."assignments" add constraint "assignments_pkey" PRIMARY KEY using index "assignments_pkey";

alter table "public"."exam_answers" add constraint "exam_answers_pkey" PRIMARY KEY using index "exam_answers_pkey";

alter table "public"."exam_questions" add constraint "exam_questions_pkey" PRIMARY KEY using index "exam_questions_pkey";

alter table "public"."exam_results" add constraint "exam_results_pkey" PRIMARY KEY using index "exam_results_pkey";

alter table "public"."exam_templates" add constraint "exam_templates_pkey" PRIMARY KEY using index "exam_templates_pkey";

alter table "public"."exams" add constraint "exams_pkey" PRIMARY KEY using index "exams_pkey";

alter table "public"."group_members" add constraint "group_members_pkey" PRIMARY KEY using index "group_members_pkey";

alter table "public"."groups" add constraint "groups_pkey" PRIMARY KEY using index "groups_pkey";

alter table "public"."tenant_staffs" add constraint "tenant_staffs_pkey" PRIMARY KEY using index "tenant_staffs_pkey";

alter table "public"."tenants" add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."admin_users" add constraint "admin_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."admin_users" validate constraint "admin_users_user_id_fkey";

alter table "public"."admin_users" add constraint "admin_users_user_id_key" UNIQUE using index "admin_users_user_id_key";

alter table "public"."assignments" add constraint "assignments_assigned_by_fkey" FOREIGN KEY (assigned_by) REFERENCES public.users(id) ON DELETE SET NULL not valid;

alter table "public"."assignments" validate constraint "assignments_assigned_by_fkey";

alter table "public"."assignments" add constraint "assignments_exam_id_fkey" FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE not valid;

alter table "public"."assignments" validate constraint "assignments_exam_id_fkey";

alter table "public"."assignments" add constraint "assignments_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE CASCADE not valid;

alter table "public"."assignments" validate constraint "assignments_tenant_id_fkey";

alter table "public"."exam_answers" add constraint "exam_answers_exam_result_id_fkey" FOREIGN KEY (exam_result_id) REFERENCES public.exam_results(id) ON DELETE CASCADE not valid;

alter table "public"."exam_answers" validate constraint "exam_answers_exam_result_id_fkey";

alter table "public"."exam_answers" add constraint "exam_answers_question_id_fkey" FOREIGN KEY (question_id) REFERENCES public.exam_questions(id) ON DELETE CASCADE not valid;

alter table "public"."exam_answers" validate constraint "exam_answers_question_id_fkey";

alter table "public"."exam_questions" add constraint "exam_questions_exam_id_fkey" FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE not valid;

alter table "public"."exam_questions" validate constraint "exam_questions_exam_id_fkey";

alter table "public"."exam_results" add constraint "exam_results_assignment_id_fkey" FOREIGN KEY (assignment_id) REFERENCES public.assignments(id) ON DELETE SET NULL not valid;

alter table "public"."exam_results" validate constraint "exam_results_assignment_id_fkey";

alter table "public"."exam_results" add constraint "exam_results_exam_id_fkey" FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE not valid;

alter table "public"."exam_results" validate constraint "exam_results_exam_id_fkey";

alter table "public"."exam_results" add constraint "exam_results_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."exam_results" validate constraint "exam_results_user_id_fkey";

alter table "public"."exam_templates" add constraint "exam_templates_author_id_fkey" FOREIGN KEY (author_id) REFERENCES public.admin_users(user_id) ON DELETE SET NULL not valid;

alter table "public"."exam_templates" validate constraint "exam_templates_author_id_fkey";

alter table "public"."exams" add constraint "exams_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL not valid;

alter table "public"."exams" validate constraint "exams_created_by_fkey";

alter table "public"."exams" add constraint "exams_template_id_fkey" FOREIGN KEY (template_id) REFERENCES public.exam_templates(id) ON DELETE SET NULL not valid;

alter table "public"."exams" validate constraint "exams_template_id_fkey";

alter table "public"."exams" add constraint "exams_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE CASCADE not valid;

alter table "public"."exams" validate constraint "exams_tenant_id_fkey";

alter table "public"."group_members" add constraint "group_members_group_id_fkey" FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_members" validate constraint "group_members_group_id_fkey";

alter table "public"."group_members" add constraint "group_members_staff_id_fkey" FOREIGN KEY (staff_id) REFERENCES public.tenant_staffs(id) ON DELETE CASCADE not valid;

alter table "public"."group_members" validate constraint "group_members_staff_id_fkey";

alter table "public"."group_members" add constraint "group_members_unique" UNIQUE using index "group_members_unique";

alter table "public"."groups" add constraint "groups_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL not valid;

alter table "public"."groups" validate constraint "groups_created_by_fkey";

alter table "public"."groups" add constraint "groups_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE CASCADE not valid;

alter table "public"."groups" validate constraint "groups_tenant_id_fkey";

alter table "public"."tenant_staffs" add constraint "tenant_staffs_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE CASCADE not valid;

alter table "public"."tenant_staffs" validate constraint "tenant_staffs_tenant_id_fkey";

alter table "public"."tenant_staffs" add constraint "tenant_staffs_unique" UNIQUE using index "tenant_staffs_unique";

alter table "public"."tenant_staffs" add constraint "tenant_staffs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."tenant_staffs" validate constraint "tenant_staffs_user_id_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."admin_users" to "anon";

grant insert on table "public"."admin_users" to "anon";

grant references on table "public"."admin_users" to "anon";

grant select on table "public"."admin_users" to "anon";

grant trigger on table "public"."admin_users" to "anon";

grant truncate on table "public"."admin_users" to "anon";

grant update on table "public"."admin_users" to "anon";

grant delete on table "public"."admin_users" to "authenticated";

grant insert on table "public"."admin_users" to "authenticated";

grant references on table "public"."admin_users" to "authenticated";

grant select on table "public"."admin_users" to "authenticated";

grant trigger on table "public"."admin_users" to "authenticated";

grant truncate on table "public"."admin_users" to "authenticated";

grant update on table "public"."admin_users" to "authenticated";

grant delete on table "public"."admin_users" to "service_role";

grant insert on table "public"."admin_users" to "service_role";

grant references on table "public"."admin_users" to "service_role";

grant select on table "public"."admin_users" to "service_role";

grant trigger on table "public"."admin_users" to "service_role";

grant truncate on table "public"."admin_users" to "service_role";

grant update on table "public"."admin_users" to "service_role";

grant delete on table "public"."assignments" to "anon";

grant insert on table "public"."assignments" to "anon";

grant references on table "public"."assignments" to "anon";

grant select on table "public"."assignments" to "anon";

grant trigger on table "public"."assignments" to "anon";

grant truncate on table "public"."assignments" to "anon";

grant update on table "public"."assignments" to "anon";

grant delete on table "public"."assignments" to "authenticated";

grant insert on table "public"."assignments" to "authenticated";

grant references on table "public"."assignments" to "authenticated";

grant select on table "public"."assignments" to "authenticated";

grant trigger on table "public"."assignments" to "authenticated";

grant truncate on table "public"."assignments" to "authenticated";

grant update on table "public"."assignments" to "authenticated";

grant delete on table "public"."assignments" to "service_role";

grant insert on table "public"."assignments" to "service_role";

grant references on table "public"."assignments" to "service_role";

grant select on table "public"."assignments" to "service_role";

grant trigger on table "public"."assignments" to "service_role";

grant truncate on table "public"."assignments" to "service_role";

grant update on table "public"."assignments" to "service_role";

grant delete on table "public"."exam_answers" to "anon";

grant insert on table "public"."exam_answers" to "anon";

grant references on table "public"."exam_answers" to "anon";

grant select on table "public"."exam_answers" to "anon";

grant trigger on table "public"."exam_answers" to "anon";

grant truncate on table "public"."exam_answers" to "anon";

grant update on table "public"."exam_answers" to "anon";

grant delete on table "public"."exam_answers" to "authenticated";

grant insert on table "public"."exam_answers" to "authenticated";

grant references on table "public"."exam_answers" to "authenticated";

grant select on table "public"."exam_answers" to "authenticated";

grant trigger on table "public"."exam_answers" to "authenticated";

grant truncate on table "public"."exam_answers" to "authenticated";

grant update on table "public"."exam_answers" to "authenticated";

grant delete on table "public"."exam_answers" to "service_role";

grant insert on table "public"."exam_answers" to "service_role";

grant references on table "public"."exam_answers" to "service_role";

grant select on table "public"."exam_answers" to "service_role";

grant trigger on table "public"."exam_answers" to "service_role";

grant truncate on table "public"."exam_answers" to "service_role";

grant update on table "public"."exam_answers" to "service_role";

grant delete on table "public"."exam_questions" to "anon";

grant insert on table "public"."exam_questions" to "anon";

grant references on table "public"."exam_questions" to "anon";

grant select on table "public"."exam_questions" to "anon";

grant trigger on table "public"."exam_questions" to "anon";

grant truncate on table "public"."exam_questions" to "anon";

grant update on table "public"."exam_questions" to "anon";

grant delete on table "public"."exam_questions" to "authenticated";

grant insert on table "public"."exam_questions" to "authenticated";

grant references on table "public"."exam_questions" to "authenticated";

grant select on table "public"."exam_questions" to "authenticated";

grant trigger on table "public"."exam_questions" to "authenticated";

grant truncate on table "public"."exam_questions" to "authenticated";

grant update on table "public"."exam_questions" to "authenticated";

grant delete on table "public"."exam_questions" to "service_role";

grant insert on table "public"."exam_questions" to "service_role";

grant references on table "public"."exam_questions" to "service_role";

grant select on table "public"."exam_questions" to "service_role";

grant trigger on table "public"."exam_questions" to "service_role";

grant truncate on table "public"."exam_questions" to "service_role";

grant update on table "public"."exam_questions" to "service_role";

grant delete on table "public"."exam_results" to "anon";

grant insert on table "public"."exam_results" to "anon";

grant references on table "public"."exam_results" to "anon";

grant select on table "public"."exam_results" to "anon";

grant trigger on table "public"."exam_results" to "anon";

grant truncate on table "public"."exam_results" to "anon";

grant update on table "public"."exam_results" to "anon";

grant delete on table "public"."exam_results" to "authenticated";

grant insert on table "public"."exam_results" to "authenticated";

grant references on table "public"."exam_results" to "authenticated";

grant select on table "public"."exam_results" to "authenticated";

grant trigger on table "public"."exam_results" to "authenticated";

grant truncate on table "public"."exam_results" to "authenticated";

grant update on table "public"."exam_results" to "authenticated";

grant delete on table "public"."exam_results" to "service_role";

grant insert on table "public"."exam_results" to "service_role";

grant references on table "public"."exam_results" to "service_role";

grant select on table "public"."exam_results" to "service_role";

grant trigger on table "public"."exam_results" to "service_role";

grant truncate on table "public"."exam_results" to "service_role";

grant update on table "public"."exam_results" to "service_role";

grant delete on table "public"."exam_templates" to "anon";

grant insert on table "public"."exam_templates" to "anon";

grant references on table "public"."exam_templates" to "anon";

grant select on table "public"."exam_templates" to "anon";

grant trigger on table "public"."exam_templates" to "anon";

grant truncate on table "public"."exam_templates" to "anon";

grant update on table "public"."exam_templates" to "anon";

grant delete on table "public"."exam_templates" to "authenticated";

grant insert on table "public"."exam_templates" to "authenticated";

grant references on table "public"."exam_templates" to "authenticated";

grant select on table "public"."exam_templates" to "authenticated";

grant trigger on table "public"."exam_templates" to "authenticated";

grant truncate on table "public"."exam_templates" to "authenticated";

grant update on table "public"."exam_templates" to "authenticated";

grant delete on table "public"."exam_templates" to "service_role";

grant insert on table "public"."exam_templates" to "service_role";

grant references on table "public"."exam_templates" to "service_role";

grant select on table "public"."exam_templates" to "service_role";

grant trigger on table "public"."exam_templates" to "service_role";

grant truncate on table "public"."exam_templates" to "service_role";

grant update on table "public"."exam_templates" to "service_role";

grant delete on table "public"."exams" to "anon";

grant insert on table "public"."exams" to "anon";

grant references on table "public"."exams" to "anon";

grant select on table "public"."exams" to "anon";

grant trigger on table "public"."exams" to "anon";

grant truncate on table "public"."exams" to "anon";

grant update on table "public"."exams" to "anon";

grant delete on table "public"."exams" to "authenticated";

grant insert on table "public"."exams" to "authenticated";

grant references on table "public"."exams" to "authenticated";

grant select on table "public"."exams" to "authenticated";

grant trigger on table "public"."exams" to "authenticated";

grant truncate on table "public"."exams" to "authenticated";

grant update on table "public"."exams" to "authenticated";

grant delete on table "public"."exams" to "service_role";

grant insert on table "public"."exams" to "service_role";

grant references on table "public"."exams" to "service_role";

grant select on table "public"."exams" to "service_role";

grant trigger on table "public"."exams" to "service_role";

grant truncate on table "public"."exams" to "service_role";

grant update on table "public"."exams" to "service_role";

grant delete on table "public"."group_members" to "anon";

grant insert on table "public"."group_members" to "anon";

grant references on table "public"."group_members" to "anon";

grant select on table "public"."group_members" to "anon";

grant trigger on table "public"."group_members" to "anon";

grant truncate on table "public"."group_members" to "anon";

grant update on table "public"."group_members" to "anon";

grant delete on table "public"."group_members" to "authenticated";

grant insert on table "public"."group_members" to "authenticated";

grant references on table "public"."group_members" to "authenticated";

grant select on table "public"."group_members" to "authenticated";

grant trigger on table "public"."group_members" to "authenticated";

grant truncate on table "public"."group_members" to "authenticated";

grant update on table "public"."group_members" to "authenticated";

grant delete on table "public"."group_members" to "service_role";

grant insert on table "public"."group_members" to "service_role";

grant references on table "public"."group_members" to "service_role";

grant select on table "public"."group_members" to "service_role";

grant trigger on table "public"."group_members" to "service_role";

grant truncate on table "public"."group_members" to "service_role";

grant update on table "public"."group_members" to "service_role";

grant delete on table "public"."groups" to "anon";

grant insert on table "public"."groups" to "anon";

grant references on table "public"."groups" to "anon";

grant select on table "public"."groups" to "anon";

grant trigger on table "public"."groups" to "anon";

grant truncate on table "public"."groups" to "anon";

grant update on table "public"."groups" to "anon";

grant delete on table "public"."groups" to "authenticated";

grant insert on table "public"."groups" to "authenticated";

grant references on table "public"."groups" to "authenticated";

grant select on table "public"."groups" to "authenticated";

grant trigger on table "public"."groups" to "authenticated";

grant truncate on table "public"."groups" to "authenticated";

grant update on table "public"."groups" to "authenticated";

grant delete on table "public"."groups" to "service_role";

grant insert on table "public"."groups" to "service_role";

grant references on table "public"."groups" to "service_role";

grant select on table "public"."groups" to "service_role";

grant trigger on table "public"."groups" to "service_role";

grant truncate on table "public"."groups" to "service_role";

grant update on table "public"."groups" to "service_role";

grant delete on table "public"."tenant_staffs" to "anon";

grant insert on table "public"."tenant_staffs" to "anon";

grant references on table "public"."tenant_staffs" to "anon";

grant select on table "public"."tenant_staffs" to "anon";

grant trigger on table "public"."tenant_staffs" to "anon";

grant truncate on table "public"."tenant_staffs" to "anon";

grant update on table "public"."tenant_staffs" to "anon";

grant delete on table "public"."tenant_staffs" to "authenticated";

grant insert on table "public"."tenant_staffs" to "authenticated";

grant references on table "public"."tenant_staffs" to "authenticated";

grant select on table "public"."tenant_staffs" to "authenticated";

grant trigger on table "public"."tenant_staffs" to "authenticated";

grant truncate on table "public"."tenant_staffs" to "authenticated";

grant update on table "public"."tenant_staffs" to "authenticated";

grant delete on table "public"."tenant_staffs" to "service_role";

grant insert on table "public"."tenant_staffs" to "service_role";

grant references on table "public"."tenant_staffs" to "service_role";

grant select on table "public"."tenant_staffs" to "service_role";

grant trigger on table "public"."tenant_staffs" to "service_role";

grant truncate on table "public"."tenant_staffs" to "service_role";

grant update on table "public"."tenant_staffs" to "service_role";

grant delete on table "public"."tenants" to "anon";

grant insert on table "public"."tenants" to "anon";

grant references on table "public"."tenants" to "anon";

grant select on table "public"."tenants" to "anon";

grant trigger on table "public"."tenants" to "anon";

grant truncate on table "public"."tenants" to "anon";

grant update on table "public"."tenants" to "anon";

grant delete on table "public"."tenants" to "authenticated";

grant insert on table "public"."tenants" to "authenticated";

grant references on table "public"."tenants" to "authenticated";

grant select on table "public"."tenants" to "authenticated";

grant trigger on table "public"."tenants" to "authenticated";

grant truncate on table "public"."tenants" to "authenticated";

grant update on table "public"."tenants" to "authenticated";

grant delete on table "public"."tenants" to "service_role";

grant insert on table "public"."tenants" to "service_role";

grant references on table "public"."tenants" to "service_role";

grant select on table "public"."tenants" to "service_role";

grant trigger on table "public"."tenants" to "service_role";

grant truncate on table "public"."tenants" to "service_role";

grant update on table "public"."tenants" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

CREATE TRIGGER update_admin_users_timestamp BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assignments_timestamp BEFORE UPDATE ON public.assignments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exam_questions_timestamp BEFORE UPDATE ON public.exam_questions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exam_results_timestamp BEFORE UPDATE ON public.exam_results FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exam_templates_timestamp BEFORE UPDATE ON public.exam_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exams_timestamp BEFORE UPDATE ON public.exams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_groups_timestamp BEFORE UPDATE ON public.groups FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tenant_staffs_timestamp BEFORE UPDATE ON public.tenant_staffs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tenants_timestamp BEFORE UPDATE ON public.tenants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_users_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();



