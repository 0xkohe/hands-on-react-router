# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Router v7 job board application built with TypeScript and Vite. The project features a multi-role system with admin, tenant (company), and user (candidate) interfaces. It uses modern React Router features including file-based routing, server-side rendering, and TypeScript by default.

## Key Architecture

- **Framework**: React Router v7 with Vite
- **Routing**: File-based routing using `@react-router/fs-routes` - routes are automatically generated from files in `app/routes/`
- **Styling**: TailwindCSS v4 with Vite plugin
- **TypeScript**: Strict mode enabled with path aliases (`~/*` maps to `./app/*`)
- **Mode**: **SPA Mode** (Single Page Application) - Server-side features like `loader` and `action` are NOT available
- **Database**: Supabase with typed client using TypeScript generated types from `app/database.types.ts`

## Common Commands

```bash
# Development
npm run dev                 # Start development server on http://localhost:5173

# Building
npm run build              # Build for production (outputs to ./build/)
npm run start              # Start production server

# Type checking
npm run typecheck          # Generate React Router types and run TypeScript check

```

## Type Safety Requirements

**IMPORTANT**: Always run `npm run typecheck` after making code changes:

- Run typecheck before committing code changes
- Run typecheck after adding or modifying components
- Run typecheck after updating dependencies
- Run typecheck before creating pull requests

This ensures type safety and catches potential issues early in the development process.

## Project Structure

```
app/
├── root.tsx              # Root layout component with HTML shell
├── routes.ts             # Route configuration using flatRoutes()
├── app.css              # Global styles
└── routes/              # File-based routing directory
    ├── _auth.admin.login/     # Admin authentication
    ├── _auth.client.login/    # Client authentication  
    ├── _index/                # Landing page
    ├── admin.*/               # Admin panel routes
    ├── tenant.*/              # Company/tenant routes
    ├── user.*/                # User/candidate routes
    └── home/                  # Home page
```

## Development Notes

- Routes are automatically generated from the `app/routes/` directory structure
- Type safety is provided through React Router's generated types in `.react-router/types/`
- The root layout in `app/root.tsx` includes global error boundary and document structure
- TailwindCSS is configured with the Vite plugin for modern CSS handling
- Path alias `~/*` resolves to `./app/*` for cleaner imports

### File Organization Strategy

**IMPORTANT**: When creating new components, hooks, utilities, or types, always organize them within the target folder structure:

- **Route-specific files**: Create subdirectories within the route folder for better organization:
  ```
  app/routes/[route-name]/
  ├── route.tsx              # Main route component
  ├── components/            # Route-specific components
  │   └── ComponentName.tsx
  ├── hooks/                 # Custom hooks for this route
  │   └── useFeatureName.ts
  ├── types/                 # Type definitions for this route
  │   └── types.ts
  └── utils/                 # Utility functions for this route
      └── helpers.ts
  ```

- **Shared files**: Only move files to shared locations when they are genuinely reused across multiple features:
  - `app/components/` - Components used in multiple routes
  - `app/lib/` - Shared utility functions and libraries
  - `app/types/` - Shared type definitions
  - `app/hooks/` - Shared custom hooks

- **Benefits of this approach**:
  - Clear dependencies and ownership
  - Easier to find and maintain related code
  - Reduces coupling between features
  - Makes refactoring safer and more predictable

### File Size Management

**IMPORTANT**: Maintain reasonable file sizes to improve code readability and maintainability:

- **File size limit**: Keep individual files under **600-700 lines of code**
- **When a file exceeds this threshold**, split it appropriately:
  - **Large route components**: Extract logical sections into separate component files within the route's `components/` subdirectory
  - **Complex hooks**: Break down into multiple focused hooks in the `hooks/` subdirectory
  - **Utility collections**: Group related utilities into separate files organized by concern
  - **Type definitions**: Split into logical groups across multiple type files

- **Splitting strategy**:
  - Maintain co-location: Split files within their target folder structure
  - Create subdirectories as needed (e.g., `components/forms/`, `components/modals/`)
  - Keep related code together even after splitting
  - Update imports to reflect the new file structure

- **Example of splitting a large route component**:
  ```
  app/routes/tenant.jobs/
  ├── route.tsx                    # Main route (keeps layout/orchestration)
  ├── components/
  │   ├── JobForm.tsx             # Extracted form component
  │   ├── JobList.tsx             # Extracted list component
  │   └── JobFilters.tsx          # Extracted filters component
  ├── hooks/
  │   ├── useJobData.ts           # Data fetching hook
  │   └── useJobFilters.ts        # Filter logic hook
  └── utils/
      └── jobValidation.ts        # Validation utilities
  ```

### ⚠️ SPA Mode Constraints

**IMPORTANT**: This application runs in SPA (Single Page Application) mode. The following React Router features are **NOT available**:

- ❌ `loader` functions - Use `useEffect` with client-side data fetching instead
- ❌ `action` functions - Use event handlers with direct API calls instead
- ❌ Server-side redirects - Use `useNavigate()` hook for client-side navigation
- ❌ `useLoaderData()` - Manage state with `useState` and fetch data in `useEffect`

**Correct patterns for SPA mode**:

```typescript
// ❌ WRONG - loader not supported in SPA mode
export async function loader() {
  return await fetchData();
}

// ✅ CORRECT - Use useEffect for data fetching
export default function Component() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await api.getData();
      setData(result);
    }
    fetchData();
  }, []);
}

// ❌ WRONG - action not supported in SPA mode
export async function action({ request }: Route.ActionArgs) {
  return await saveData(request);
}

// ✅ CORRECT - Use event handlers
export default function Component() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.saveData(formData);
  };
}
```

### Data Fetching with Supabase

- Use the typed Supabase client from `~/lib/supabaseClient`
- All database operations must be done client-side in components or custom hooks
- Use `useAuth()` from `~/contexts/AuthContext` to get the current user
- Create custom hooks in the component directory (e.g., `app/routes/user.profile/hooks/`) for reusable data operations

### Database Schema and Types

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

### Supabase Schema Management

Database schema is managed through modular SQL files in the `supabase/schemas/` directory. The structure is organized by execution order:

- **00_setup/** - Database extensions and initial configuration
- **01_types/** - Custom PostgreSQL types and enums
- **02_tables/** - Table definitions (users, profiles, tenants, jobs, applications, messages, etc.)
- **03_functions/** - Stored procedures and database functions
- **04_policies/** - Row Level Security (RLS) policies for access control
- **05_views/** - Database views for complex queries
- **06_triggers/** - Automated database triggers
- **07_indexes/** - Performance optimization indexes

When modifying the database schema:
1. Update the appropriate SQL file in the corresponding directory
2. Run migrations via Supabase CLI
3. Regenerate TypeScript types with `supabase gen types typescript --local > app/database.types.ts`

## Application Structure

This job board application has three main user roles:

- **Admin**: System administration with routes under `admin.*`
- **Tenant**: Company/employer interface with routes under `tenant.*`
- **User**: Job seeker/candidate interface with routes under `user.*`


## Docker Support

The project includes a Dockerfile for containerized deployment. Production builds can be deployed to any Docker-compatible platform.

