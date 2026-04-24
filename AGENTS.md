# AGENTS.md

## Verify code

```bash
npm run lint && npm run typecheck && npm run test && npm run format
```

Run `npm run dev` for dev server at http://localhost:3000.

## Stack

- Next.js 15 (App Router, static export to `out/`)
- React 19 + TypeScript strict
- Tailwind CSS + CSS variables for theming
- `next-themes` for dark/light persistence
- Framer Motion for animations
- Vitest for unit tests (NOT Jest)
- ESLint + Prettier

## Architecture

```
app/                    # App Router layouts and routes
  (dashboard)/         # Route group for dashboard pages
components/
  ui/                  # shadcn-style primitives (button, card, dialog, etc.)
  dashboard/           # Dashboard-specific components
lib/
  dashboard/           # Adapter pattern: contracts, mock-data, selectors
  ui/                 # Design tokens and base UI components
```

**Key rule**: Never import from `mock-adapter` directly in components. Use `contracts.ts` for types and `selectors.ts` for derived state.

## shadcn-ui Components

**Available in `components/ui/`**: badge, button, card, dialog, input, select, separator, sheet, table

**Radix dependencies installed**: @radix-ui/react-dialog, @radix-ui/react-dropdown-menu, @radix-ui/react-select, @radix-ui/react-separator, @radix-ui/react-slot, @radix-ui/react-tabs

### Radix Dialog quirk

`DialogContent` from `components/ui/dialog.tsx` requires a `DialogTitle` for accessibility. The base component includes a hidden fallback (`sr-only`), but explicit `DialogTitle` inside dialogs is still required. If you create a new dialog, include both `DialogTitle` and optionally `DialogDescription`.

## UI Design System

Before generating UI code, read `.agents/skills/uncodixfy.md` to avoid generic AI patterns.

### Tokens (`lib/ui/tokens.ts`)

- `spacing`: gap-1 a gap-6
- `padding`: p-2 a p-6
- `radius`: rounded-sm/md/lg
- `typography`: h1, h2, h3, body, small, muted
- `card`: base, section
- `button`: base, hover, active
- `navigation`: item, itemActive, itemInactive

### Base components (`lib/ui/components.tsx`)

- `<Card variant="default | section">`
- `<Section spacing="lg">`
- `<Title level="h1">`
- `<Subtitle>`
- `<Badge variant="default | muted">`
- `<NavLink href active>`
- `<NavList>`

### Uncodixfy rules

- No excessive `tracking-[]`
- No decorative uppercase
- No `border-left` as decoration
- Max radius 12px
- Badges only when functional
- Consistent spacing

## Tests

```bash
npm run test                    # Run all tests
vitest run lib/dashboard/selectors.test.ts  # Single file
```

Test files: `*.test.ts`, `*.test.tsx`. Environment: jsdom.

## Build

Static export to `out/`: `npm run build`. Output uses trailing slashes (`/areas/`). Configure Vercel with output directory `out`.

## Current Work (fix.md - potentially stale)

shadcn-ui migration in progress. Phase 1 (infrastructure) largely complete. Phase 2 (component migration) ongoing.
