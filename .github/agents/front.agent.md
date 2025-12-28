---
description: "Front mode"
name: "Front Mode"
tools: ['execute/getTerminalOutput', 'execute/runTask', 'execute/createAndRunTask', 'execute/runInTerminal', 'execute/runTests', 'read/problems', 'read/readFile', 'read/terminalSelection', 'read/terminalLastCommand', 'read/getTaskOutput', 'edit/editFiles', 'search', 'web/fetch', 'agent', 'todo']
model: Claude Haiku 4.5
---

# Frontend Development Guide

This file provides guidance for frontend UI implementation in this React Router v7 application.

## React Router v7 File-based Routing (fs-routes)

This project uses React Router v7's file-based routing system with `@react-router/fs-routes`. Routes are automatically generated from the `app/routes/` directory structure.

### File-based Routing Conventions

- Routes are automatically generated from files in `app/routes/`
- Each route is defined by either a direct `.tsx` file or a folder containing `route.tsx`
- Folder structure directly maps to URL paths
- The routing configuration is in `app/routes.ts` using `flatRoutes()`

### Path Mapping Rules

The folder/file name determines the URL path:

| File Path | URL Path |
|-----------|----------|
| `app/routes/home.tsx` | `/home` |
| `app/routes/user.tsx` | `/user` |
| `app/routes/user.profile/route.tsx` | `/user/profile` |
| `app/routes/user.settings/route.tsx` | `/user/settings` |
| `app/routes/tenant.jobs/route.tsx` | `/tenant/jobs` |
| `app/routes/admin.dashboard/route.tsx` | `/admin/dashboard` |
| `app/routes/_index/route.tsx` | `/` (home page) |

### Folder Naming Convention

**IMPORTANT**: Use dots (`.`) to separate path segments in folder names:

- ✅ `user.profile/` → `/user/profile`
- ✅ `tenant.jobs.new/` → `/tenant/jobs/new`
- ✅ `admin.users.edit/` → `/admin/users/edit`

Each folder must contain a `route.tsx` file to be a valid route.

### Creating New Pages

Follow these steps when creating a new page:

1. **Create a folder** with the desired path using dots for segments:
   ```
   app/routes/user.aaa/
   ```

2. **Add a `route.tsx` file** inside:
   ```tsx
   // app/routes/user.aaa/route.tsx
   import type { Route } from "./+types/user.aaa";

   export function meta({}: Route.MetaArgs) {
     return [
       { title: "Page Title" },
       { name: "description", content: "Page description" },
     ];
   }

   export default function UserAaa() {
     return (
       <div>
         <h1>User AAA Page</h1>
         {/* Your component content */}
       </div>
     );
   }
   ```

3. **TypeScript types** are automatically generated in `.react-router/types/`

### Example Route Structure

```
app/routes/
├── _index/route.tsx          → /
├── home.tsx                  → /home
├── user.tsx                  → /user (can be a layout)
├── user.profile/route.tsx    → /user/profile
├── user.settings/route.tsx   → /user/settings
├── tenant.jobs/route.tsx     → /tenant/jobs
├── tenant.jobs.new/route.tsx → /tenant/jobs/new
└── admin.dashboard/route.tsx → /admin/dashboard
```

### Special Files and Patterns

- **Underscore prefix** (`_index`, `_auth`): Used for special routes
  - `_index/` → Root path `/`
  - `_auth.*` → Authentication routes
- **Layout routes**: A file like `user.tsx` can serve as a layout for nested `user.*` routes
- **Dynamic segments**: Use `$param` syntax (e.g., `jobs.$id/route.tsx` → `/jobs/:id`)

## Project Overview

This is a React Router v7 job board application built with TypeScript and Vite. The project features a multi-role system with admin, tenant (company), and user (candidate) interfaces. It uses modern React Router features including file-based routing, server-side rendering, and TypeScript by default.

## Key Architecture

- **Framework**: React Router v7 with Vite
- **Routing**: File-based routing using `@react-router/fs-routes` - routes are automatically generated from files in `app/routes/`
- **Styling**: TailwindCSS v4 with Vite plugin
- **TypeScript**: Strict mode enabled with path aliases (`~/*` maps to `./app/*`)
- **Mode**: **SPA Mode** (Single Page Application) - Server-side features like `loader` and `action` are NOT available
- **Design**: Modern, clean, and responsive UI design following contemporary design principles

## Modern Design Guidelines

**IMPORTANT**: Follow modern design principles when implementing UI components:

- **Clean and Minimal**: Use clean layouts with plenty of white space
- **Responsive Design**: Ensure all components work seamlessly across desktop, tablet, and mobile devices
- **Consistent Typography**: Use consistent font sizes, weights, and spacing throughout the application
- **Color System**: Maintain a consistent color palette using TailwindCSS design tokens
- **Interactive Elements**: Implement smooth hover effects, transitions, and focus states
- **Accessibility**: Follow WCAG guidelines for contrast, keyboard navigation, and screen reader compatibility
- **Component Consistency**: Ensure similar components have consistent styling and behavior
- **Loading States**: Implement proper loading indicators and skeleton screens for better UX

## Common Commands

```bash
# Development
npm run dev                 # Start development server on http://localhost:5173

# Building
npm run build              # Build for production (outputs to ./build/)
npm run start              # Start production server

# Type checking
npm run typecheck          # Generate React Router types and run TypeScript check
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
├── root.tsx              # Root layout component with HTML shell
├── routes.ts             # Route configuration using flatRoutes()
├── app.css              # Global styles
└── routes/              # File-based routing directory
    ├── _auth.admin.login/     # Admin authentication
    ├── _auth.client.login/    # Client authentication
    ├── _index/                # Landing page
    ├── admin.*/               # Admin panel routes
    ├── tenant.*/              # Company/tenant routes
    ├── user.*/                # User/candidate routes
    └── home/                  # Home page
```

## Development Notes

- Routes are automatically generated from the `app/routes/` directory structure
- Type safety is provided through React Router's generated types in `.react-router/types/`
- The root layout in `app/root.tsx` includes global error boundary and document structure
- TailwindCSS is configured with the Vite plugin for modern CSS handling
- Path alias `~/*` resolves to `./app/*` for cleaner imports

### File Organization Strategy

**IMPORTANT**: When creating new components, hooks, utilities, or types, always organize them within the target folder structure:

- **Route-specific files**: **ALWAYS prefer this approach** - Create subdirectories within the route folder for better organization:
  ```
  app/routes/[route-name]/
  ├── route.tsx              # Main route component
  ├── components/            # Route-specific components
  │   └── ComponentName.tsx
  ├── hooks/                 # Custom hooks for this route
  │   └── useFeatureName.ts
  ├── types/                 # Type definitions for this route
  │   └── types.ts
  └── utils/                 # Utility functions for this route
      └── helpers.ts
  ```

- **⚠️ Shared files - AVOID BY DEFAULT**: **Do NOT use shared locations unless absolutely necessary**. Only move files to shared locations in exceptional cases when code is genuinely reused across **3 or more** different routes and there's a clear business justification:
  - `app/components/` - Components used in multiple routes (avoid by default)
    - **Exception**: Navigation components (Header, Sidebar, etc.) can be shared as they are used across multiple layouts
  - `app/lib/` - Shared utility functions and libraries (avoid by default)
  - `app/types/` - Shared type definitions (avoid by default)
  - `app/hooks/` - Shared custom hooks (avoid by default)

- **Principle**: **Prefer duplication over premature abstraction**. Even if code looks similar, keep it within each route folder until there's a proven need for sharing.

- **Benefits of this route-specific approach**:
  - Clear dependencies and ownership
  - Easier to find and maintain related code
  - Reduces coupling between features
  - Makes refactoring safer and more predictable
  - Avoids premature abstraction
  - Each route is self-contained and independent

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
  ├── route.tsx                    # Main route (keeps layout/orchestration)
  ├── components/
  │   ├── JobForm.tsx             # Extracted form component
  │   ├── JobList.tsx             # Extracted list component
  │   └── JobFilters.tsx          # Extracted filters component
  ├── hooks/
  │   ├── useJobData.ts           # Data fetching hook
  │   └── useJobFilters.ts        # Filter logic hook
  └── utils/
      └── jobValidation.ts        # Validation utilities
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

## Application Structure

This job board application has three main user roles:

- **Admin**: System administration with routes under `admin.*`
- **Tenant**: Company/employer interface with routes under `tenant.*`
- **User**: Job seeker/candidate interface with routes under `user.*`
