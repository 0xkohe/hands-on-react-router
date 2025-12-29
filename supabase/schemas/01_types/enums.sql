-- Tenant role types
CREATE TYPE tenant_role_enum AS ENUM ('owner', 'admin', 'member');

-- Status for various entities
CREATE TYPE entity_status_enum AS ENUM ('active', 'inactive', 'suspended');

-- Tenant staff status
CREATE TYPE staff_status_enum AS ENUM ('active', 'pending', 'inactive');

-- Exam difficulty levels
CREATE TYPE difficulty_enum AS ENUM ('beginner', 'intermediate', 'advanced');

-- Exam/template status
CREATE TYPE exam_status_enum AS ENUM ('draft', 'published', 'archived');

-- Question types
CREATE TYPE question_type_enum AS ENUM ('multiple_choice', 'short_answer', 'essay', 'true_false');

-- Assignment status
CREATE TYPE assignment_status_enum AS ENUM ('active', 'completed', 'archived');

-- Assignment target type
CREATE TYPE assignment_target_type_enum AS ENUM ('all', 'group', 'individual');

-- Tenant plan types
CREATE TYPE plan_enum AS ENUM ('starter', 'professional', 'enterprise');
