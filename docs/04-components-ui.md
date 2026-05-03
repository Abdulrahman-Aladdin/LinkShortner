# Components & UI - shadcn/ui Standards

This document outlines UI component standards for the LinkShortner application. All UI elements must use shadcn/ui components.

## Core Principle

**Use shadcn/ui exclusively. Do not create custom components.**

All user interface elements must be built using shadcn/ui components. Custom component creation is prohibited unless explicitly justified and approved.

## Why shadcn/ui?

- **Consistent Design**: All components follow a unified design system
- **Accessibility Built-In**: Components include ARIA labels and keyboard navigation
- **Tailwind Integration**: Full integration with Tailwind CSS for styling
- **Dark Mode Support**: All components include dark mode variants out-of-the-box
- **Type-Safe**: Full TypeScript support with proper type definitions
- **Customizable**: Modify appearance through Tailwind classes and design tokens

## Available Components

Common shadcn/ui components for this project:

- **Button** - All interactive buttons (`<Button>`)
- **Form** - Form components and validation (`<Form>`)
- **Input** - Text input fields (`<Input>`)
- **Label** - Form labels (`<Label>`)
- **Card** - Content containers (`<Card>`, `<CardContent>`, `<CardDescription>`, `<CardHeader>`, `<CardTitle>`)
- **Dialog** - Modal dialogs (`<Dialog>`)
- **Alert** - Alert messages (`<Alert>`)
- **Badge** - Status badges (`<Badge>`)
- **Dropdown Menu** - Dropdown menus (`<DropdownMenu>`)
- **Table** - Data tables (`<Table>`)

Additional components can be added via `npx shadcn-ui@latest add [component-name]`

## Usage Patterns

### Buttons
```typescript
import { Button } from '@/components/ui/button';

export function Example() {
  return (
    <>
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button disabled>Disabled</Button>
    </>
  );
}
```

### Forms
```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  return (
    <form>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="user@example.com" />
        </div>
        <Button type="submit">Sign In</Button>
      </div>
    </form>
  );
}
```

### Cards
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function StatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Link Statistics</CardTitle>
        <CardDescription>Your link performance</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">1,234</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Total clicks</p>
      </CardContent>
    </Card>
  );
}
```

## Dark Mode Support

All shadcn/ui components automatically support dark mode through the `dark:` Tailwind prefix.

**Never hardcode colors.** Always use Tailwind classes with dark mode variants:

```typescript
// ✅ GOOD - Includes dark mode
<div className="bg-white dark:bg-slate-950 text-black dark:text-white">
  Content
</div>

// ❌ WRONG - No dark mode support
<div className="bg-white text-black">
  Content
</div>
```

## Styling Guidelines

- Use Tailwind CSS classes for all styling
- Use semantic color names from the design tokens (e.g., `bg-primary`, `text-destructive`)
- Maintain consistent spacing using Tailwind's spacing scale
- Apply dark mode variants for all color changes
- Use `className` prop for conditional or dynamic styling

## When NOT to Use Custom Components

These scenarios should still use shadcn/ui base components, not custom components:

- Specialized forms → Use shadcn form components with custom fields
- Complex dialogs → Compose shadcn Dialog with other components
- Custom layouts → Use Tailwind grid/flexbox, not wrapper components
- Theme-specific styling → Use Tailwind's design tokens and dark mode

## Component Installation

Add new components using the CLI:

```bash
npx shadcn-ui@latest add [component-name]
```

This creates a copy of the component in `components/ui/` customized for your project.

## Accessibility Checklist

All shadcn/ui components include accessibility by default, but verify:

- [ ] Forms have associated `<Label>` elements with `htmlFor` attributes
- [ ] Buttons have descriptive text or aria-labels
- [ ] Dialogs include proper ARIA roles and focus management
- [ ] Color is not the only indicator (use text + color)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)

---

**Last Updated**: May 2026  
**shadcn/ui Version**: Latest  
**Related**: [02 - TypeScript & React](./02-typescript-react.md), [01 - Coding Standards](./01-coding-standards.md)
