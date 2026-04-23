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

**Never import from mock-adapter directly** in components. Use contracts to define types, selectors to derive state.

## Tests

- Vitest: `npm run test` (not jest)
- Run single file: `vitest run lib/dashboard/selectors.test.ts`
- Test files: `*.test.ts`, `*.test.tsx`

## Build

Static export to `out/`: `npm run build`. Output uses trailing slashes (e.g., `/areas/`).