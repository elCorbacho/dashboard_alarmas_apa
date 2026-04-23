# AGENTS.md

## Verify code

```bash
npm run lint && npm run typecheck && npm run test && npm run format:check
```

Run `npm run dev` for dev server at http://localhost:3000.

## Architecture

- App Router: `app/` with route groups `(dashboard)`
- UI components: `components/dashboard/`
- Data layer (adapter pattern): `lib/dashboard/{contracts,mock-data,selectors,mock-adapter}.ts`
- UI layer: `lib/ui/{tokens,components}.ts`

**Never import from mock-adapter directly** in components. Use contracts to define types, selectors to derive state.

## UI Design System

Antes de generar código UI, leer `.agents/skills/uncodixfy.md` para evitar patrones de IA genérica.

### Tokens (lib/ui/tokens.ts)

- `spacing`: gap-1 a gap-6
- `padding`: p-2 a p-6
- `radius`: rounded-sm/md/lg
- `typography`: h1, h2, h3, body, small, muted
- `card`: base, section
- `button`: base, hover, active
- `navigation`: item, itemActive, itemInactive

### Componentes base (lib/ui/components.tsx)

- `<Card variant="default | section">`
- `<Section spacing="lg">`
- `<Title level="h1">`
- `<Subtitle>`
- `<Badge variant="default | muted">`
- `<NavLink href active>`
- `<NavList>`

### reglasUncodixfy

- Sin tracking-[] excesivo
- Sin uppercase decorativo
- Sin border-left como decoration
- Radio máximo 12px
- Badges solo cuando son funcionales
- Espaciado consistente

## Tests

- Vitest: `npm run test` (not jest)
- Run single file: `vitest run lib/dashboard/selectors.test.ts`
- Test files: `*.test.ts`, `*.test.tsx`

## Build

Static export to `out/`: `npm run build`. Output uses trailing slashes (e.g., `/areas/`).