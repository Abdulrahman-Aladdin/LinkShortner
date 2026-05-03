# LinkShortner - Agent Instructions

This document provides comprehensive coding standards and best practices for all LLM agents working on the LinkShortner project. All contributions must adhere to these guidelines.

## Project Overview

**LinkShortner** is a modern URL shortening service built with:
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL (Neon serverless) with Drizzle ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS + shadcn/ui components
- **Testing**: Jest + React Testing Library

## Quick Start for LLMs

When working on this project:
1. Read the relevant instruction file(s) from the `/docs` directory
2. Follow the coding standards and patterns provided
3. Test your changes according to testing standards
4. Ensure TypeScript strict mode compliance
5. Validate ESLint passes

## Instruction Documents

All detailed standards are organized in the `/docs` directory:

- [04 - Components & UI](./docs/04-components-ui.md) — shadcn/ui usage standards, component selection, dark mode support, and accessibility
- [06 - Authentication](./docs/06-authentication.md) — Clerk-only authentication, protected routes, sign-in/sign-up modals, and user isolation patterns

---

## Key Principles

### 1. **Type Safety First**
- TypeScript strict mode is enabled
- Avoid `any` type - use `unknown` with type guards
- Define interfaces for all object shapes
- Leverage TypeScript's compile-time safety

### 2. **User-Centric Authentication**
- All user data is isolated by userId from Clerk
- Always validate resource ownership before modifications
- Return appropriate 401/403 errors
- Never trust client-provided user IDs

### 3. **Database First**
- Use Drizzle ORM for all database operations
- Always include indexed columns in query WHERE clauses
- Paginate result sets
- Use relations to prevent N+1 queries

### 4. **Accessibility Matters**
- Use semantic HTML (`<button>`, `<form>`, `<label>`)
- Include ARIA labels where needed
- Support keyboard navigation
- Test with screen readers

### 5. **Performance by Default**
- Optimize images with Next.js `Image` component
- Code-split large components with `dynamic()`
- Memoize expensive computations
- Monitor Core Web Vitals

### 6. **Error Handling**
- Never silently fail - always handle or propagate errors
- Provide meaningful error messages to users
- Log errors with sufficient context
- Use specific error classes for different scenarios

### 7. **Dark Mode Support**
- Always include dark mode variants with `dark:` prefix
- Use consistent color palette across components
- Test both light and dark modes

## Development Workflow

### Before Starting
1. Check which instruction file(s) apply to your task
2. Review the patterns and examples provided
3. Understand the project structure and conventions

### During Development
1. Follow the specific patterns from the relevant instruction files
2. Write code that passes TypeScript strict mode
3. Ensure ESLint compliance
4. Test your changes according to the testing standards

### Before Committing
1. Verify TypeScript compilation: `npm run build`
2. Run linting: `npm run lint`
3. Run tests: `npm test`
4. Update tests if modifying existing functionality

## Common Tasks Quick Reference

| Task | Reference |
|------|-----------|
| Create a new component | [04 - Components & UI](./docs/04-components-ui.md) |
| Add a database table | [03 - Database & Drizzle ORM](./docs/03-database-drizzle.md) |
| Create an API endpoint | [05 - API Routes](./docs/05-api-routes.md) |
| Implement authentication | [06 - Authentication](./docs/06-authentication.md) |
| Optimize performance | [08 - Performance & Optimization](./docs/08-performance.md) |
| Write tests | [07 - Testing](./docs/07-testing.md) |
| Update TypeScript code | [02 - TypeScript & React](./docs/02-typescript-react.md) |
| General coding | [01 - Coding Standards](./docs/01-coding-standards.md) |

## Important Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Run tests
npm test

# Database migrations
npx drizzle-kit generate:pg
npx drizzle-kit push:pg
```

## Environment Setup

Required environment variables in `.env.local`:
```env
# Database
DATABASE_URL=postgresql://...

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## File Structure

```
LinkShortner/
├── app/
│   ├── api/                 # API routes
│   ├── (auth)/              # Auth pages (sign-in, sign-up)
│   ├── dashboard/           # Protected dashboard pages
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/                  # shadcn/ui components
├── db/
│   ├── index.ts            # Database connection
│   └── schema.ts           # Drizzle ORM schema
├── docs/                    # Instruction files (this directory)
├── lib/
│   └── utils.ts            # Utility functions
├── public/                  # Static assets
├── __tests__/              # Test files
├── package.json
├── tsconfig.json
├── next.config.ts
└── eslint.config.mjs
```

## Code Review Checklist

When reviewing code or checking your own work:

- [ ] TypeScript compiles with no errors (`npm run build`)
- [ ] ESLint passes (`npm run lint`)
- [ ] No `any` types used (use `unknown` or specific types)
- [ ] All database queries use proper indexing
- [ ] API routes validate authentication/authorization
- [ ] Components include dark mode support
- [ ] Forms have proper validation and error handling
- [ ] Code follows naming conventions from the standards
- [ ] Comments explain "why", not "what"
- [ ] Tests cover happy path and error cases

## Questions & Support

- **Project structure**: See [01 - Coding Standards](./docs/01-coding-standards.md)
- **React patterns**: See [02 - TypeScript & React](./docs/02-typescript-react.md)
- **Database queries**: See [03 - Database & Drizzle ORM](./docs/03-database-drizzle.md)
- **Component design**: See [04 - Components & UI](./docs/04-components-ui.md)
- **API design**: See [05 - API Routes](./docs/05-api-routes.md)
- **User sessions**: See [06 - Authentication](./docs/06-authentication.md)
- **Testing code**: See [07 - Testing](./docs/07-testing.md)
- **Speed & optimization**: See [08 - Performance & Optimization](./docs/08-performance.md)

---

**Last Updated**: May 2026  
**Project**: LinkShortner v0.1.0  
**Framework**: Next.js 16, React 19, TypeScript 5
