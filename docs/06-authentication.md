# Authentication - Clerk Integration

This document outlines authentication standards for the LinkShortner application. All user authentication is handled exclusively through Clerk.

## Core Principles

### 1. **Clerk-Only Authentication**
- All authentication must use Clerk
- **No alternative auth methods are permitted**
- Clerk middleware handles all session validation
- User identity comes exclusively from Clerk's `auth()` function

### 2. **Protected Routes**
- The `/dashboard` page is a **protected route** requiring active user session
- Use `auth()` from `@clerk/nextjs/server` to validate user access
- Return 401 Unauthorized if user is not authenticated
- Extract `userId` from auth object for database queries

### 3. **Homepage Redirect Logic**
- If an authenticated user accesses `/` (homepage), redirect them to `/dashboard`
- Use `redirect()` from `next/navigation` for client-side redirects
- Check authentication status in the page component or layout

### 4. **Sign In & Sign Up**
- Sign in and sign up flows **must launch as modals**
- Use Clerk's `<SignIn />` and `<SignUp />` components
- Route to dedicated auth pages (e.g., `/sign-in`, `/sign-up`) that render these as modals
- Configure modal appearance through Clerk's `<ClerkProvider>`

## Implementation Patterns

### Protected Route Example
```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return <>{children}</>;
}
```

### Homepage Redirect
```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }

  // Render public homepage
  return <div>Public content</div>;
}
```

### Modal Sign In/Up Pages
```typescript
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn />
    </div>
  );
}
```

## Environment Configuration

Required environment variables:
```env
# Clerk Publishable Key (safe to expose to client)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Clerk Secret Key (server-only)
CLERK_SECRET_KEY=sk_test_...

# Redirect URLs after authentication
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## User Isolation

- All database queries must filter by `userId` from `auth()`
- Never trust client-provided user IDs
- Always validate that the user owns the resource they're accessing
- Return 403 Forbidden if user attempts to access another user's data

## Best Practices

- ✅ Always call `auth()` server-side to validate sessions
- ✅ Use TypeScript to enforce authentication checks
- ✅ Return appropriate error codes (401, 403)
- ✅ Log authentication failures for security monitoring
- ❌ Never use client-side authentication checks alone
- ❌ Never implement alternative authentication methods
- ❌ Never expose `CLERK_SECRET_KEY` to the client

## Common Tasks

| Task | Location |
|------|----------|
| Validate user in API route | Use `auth()` in route handler |
| Protect a page | Use `auth()` in layout wrapper |
| Get current user ID | Call `const { userId } = await auth()` |
| Handle sign-out | Use Clerk's `<SignOutButton />` component |
| Customize auth UI | Configure in Clerk dashboard |

---

**Last Updated**: May 2026  
**Framework**: Next.js 16 + Clerk  
**TypeScript**: Strict mode enabled
