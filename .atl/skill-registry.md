# Skill Registry — dashboard_apa

**Project**: dashboard_apa
**Location**: `.atl/skill-registry.md`
**Generated**: 2026-04-23

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

## User-Level Skills (Global)

| Trigger                                                                                      | Skill          | Path                                                            |
| -------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------- |
| When creating a pull request, opening a PR, or preparing changes for review                  | branch-pr      | /home/acorbacho/.config/opencode/skills/branch-pr/SKILL.md      |
| When writing Go tests, using teatest, or adding test coverage                                | go-testing     | /home/acorbacho/.config/opencode/skills/go-testing/SKILL.md     |
| When creating a GitHub issue, reporting a bug, or requesting a feature                       | issue-creation | /home/acorbacho/.config/opencode/skills/issue-creation/SKILL.md |
| When user says "judgment day", "review adversarial", "dual review", "doble review", "juzgar" | judgment-day   | /home/acorbacho/.config/opencode/skills/judgment-day/SKILL.md   |
| When user asks to create a new skill, add agent instructions, or document patterns for AI    | skill-creator  | /home/acorbacho/.config/opencode/skills/skill-creator/SKILL.md  |
| Browser automation with Playwright, testing web pages                                        | playwright-cli | /home/acorbacho/.claude/skills/playwright-cli/SKILL.md          |

## Project-Level Skills (dashboard_apa)

| Trigger                                                              | Skill                     | Path                                                                                      |
| -------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------- |
| Next.js 15 best practices, App Router, RSC, async patterns, metadata | next-best-practices       | /home/acorbacho/proyectos/dashboard_apa/.agents/skills/next-best-practices/SKILL.md       |
| shadcn/ui components, adding, fixing, styling, composing UI          | shadcn                    | /home/acorbacho/proyectos/dashboard_apa/.agents/skills/shadcn/SKILL.md                    |
| TypeScript generics, conditional types, mapped types, utility types  | typescript-advanced-types | /home/acorbacho/proyectos/dashboard_apa/.agents/skills/typescript-advanced-types/SKILL.md |
| Vitest testing framework, mocking, coverage, fixtures                | vitest                    | /home/acorbacho/proyectos/dashboard_apa/.agents/skills/vitest/SKILL.md                    |
| Web accessibility, WCAG 2.2, screen readers, keyboard navigation     | accessibility             | /home/acorbacho/proyectos/dashboard_apa/.agents/skills/accessibility/SKILL.md             |
| Tailwind CSS v4 + shadcn/ui setup, dark mode, CSS variables          | tailwind-v4-shadcn        | /home/acorbacho/proyectos/dashboard_apa/.agents/skills/tailwind-v4-shadcn/SKILL.md        |
| Production-grade frontend design, distinctive UIs, avoiding AI slop  | frontend-design           | /home/acorbacho/proyectos/dashboard_apa/.agents/skills/frontend-design/SKILL.md           |
| SEO optimization, meta tags, structured data, sitemap                | seo                       | /home/acorbacho/proyectos/dashboard_apa/.agents/skills/seo/SKILL.md                       |

## Codex Plugin Skills (Relevant to Web Development)

| Trigger                                                               | Skill                            | Path                                                                                               |
| --------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| React/Next.js performance: waterfalls, bundle size, re-renders, RSC   | react-best-practices             | /home/acorbacho/.codex/.tmp/plugins/plugins/build-web-apps/skills/react-best-practices/SKILL.md    |
| shadcn/ui best practices, styling rules, form composition             | shadcn-best-practices            | /home/acorbacho/.codex/.tmp/plugins/plugins/build-web-apps/skills/shadcn-best-practices/SKILL.md   |
| Postgres performance, indexes, RLS, connection pooling                | supabase-postgres-best-practices | /home/acorbacho/.codex/.tmp/plugins/plugins/build-web-apps/skills/supabase-best-practices/SKILL.md |
| Stripe integration: Checkout, Payment Element, Connect, subscriptions | stripe-best-practices            | /home/acorbacho/.codex/.tmp/plugins/plugins/build-web-apps/skills/stripe-best-practices/SKILL.md   |
| Landing pages, visual composition, motion, art direction              | frontend-skill                   | /home/acorbacho/.codex/.tmp/plugins/plugins/build-web-apps/skills/frontend-skill/SKILL.md          |
| Web interface guidelines, accessibility, UX review                    | web-design-guidelines            | /home/acorbacho/.codex/.tmp/plugins/plugins/build-web-apps/skills/web-design-guidelines/SKILL.md   |
| Figma to code, pixel-perfect implementation                           | figma-implement-design           | /home/acorbacho/.codex/.tmp/plugins/plugins/figma/skills/figma-implement-design/SKILL.md           |
| Netlify serverless functions, API endpoints                           | netlify-functions                | /home/acorbacho/.codex/.tmp/plugins/plugins/netlify/skills/netlify-functions/SKILL.md              |

## Superpowers Skills (Development Workflow)

| Trigger                                                                            | Skill                          | Path                                                                                                   |
| ---------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Before claiming completion: run verification commands, evidence before assertions  | verification-before-completion | /home/acorbacho/.codex/.tmp/plugins/plugins/superpowers/skills/verification-before-completion/SKILL.md |
| TDD: write test first, red-green-refactor, no production code without failing test | test-driven-development        | /home/acorbacho/.codex/.tmp/plugins/plugins/superpowers/skills/test-driven-development/SKILL.md        |
| Debugging: root cause investigation before fixes, systematic process               | systematic-debugging           | /home/acorbacho/.codex/.tmp/plugins/plugins/superpowers/skills/systematic-debugging/SKILL.md           |
| Writing skills, AGENTS.md, patterns for AI                                         | writing-skills                 | /home/acorbacho/.codex/.tmp/plugins/plugins/superpowers/skills/writing-skills/SKILL.md                 |
| Code review process                                                                | requesting-code-review         | /home/acorbacho/.codex/.tmp/plugins/plugins/superpowers/skills/requesting-code-review/SKILL.md         |
| Receiving and applying code review feedback                                        | receiving-code-review          | /home/acorbacho/.codex/.tmp/plugins/plugins/superpowers/skills/receiving-code-review/SKILL.md          |

## Project Conventions

| File      | Path                                              | Notes                 |
| --------- | ------------------------------------------------- | --------------------- |
| AGENTS.md | /home/acorbacho/proyectos/dashboard_apa/AGENTS.md | Project configuration |

---

## Compact Rules

### branch-pr

- Every PR MUST link an approved issue (Closes #N)
- Every PR MUST have exactly one type:\* label
- Branch naming: type/description (feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)
- Conventional commits: type(scope): description
- No Co-Authored-By trailers
- Shellcheck must pass on modified scripts

### go-testing

- Table-driven tests: struct with name/input/expected/wantErr, t.Run cases
- Bubbletea TUI: test Model.Update() directly with tea.KeyMsg
- Teatest: teatest.NewTestModel(t, m), send keys, wait with teatest.WithDuration
- Golden files: filepath.Join("testdata", "TestXxx.golden"), update with -update flag
- Mock system info: set m.SystemInfo directly in tests

### issue-creation

- Blank issues disabled — must use template
- Every issue gets status:needs-review automatically
- Maintainer must add status:approved before PR
- Questions go to Discussions, not issues

### judgment-day

- Launch TWO judges in parallel (delegate async)
- Neither judge knows about the other
- Classify warnings: real (can normal user trigger?) vs theoretical
- Fix confirmed CRITICALs and real WARNINGs, then re-judge
- After 2 fix iterations, ask user before continuing
- JUDGMENT: APPROVED only when 0 CRITICALs + 0 real WARNINGs

### playwright-cli

- Use refs from snapshot to interact (playwright-cli snapshot)
- playwright-cli click e15, fill e1 "text", type "input"
- playwright-cli open, goto, close, screenshot
- playwright-cli tab-new, tab-list, tab-select
- Storage: state-save, state-load, cookie-list/set/delete

### next-best-practices

- Async params/searchParams in Next.js 15+
- 'use client' for interactivity, 'use server' for server actions
- 'use cache' for caching (Next.js)
- Use next/image, next/font, not raw img/font
- error.tsx, global-error.tsx, not-found.tsx for errors
- Avoid waterfalls: Promise.all, Suspense, preload

### shadcn

- className for layout only, never override component colors
- gap-_ not space-y-_, size-_ not w-_ h-\*
- cn() for conditional classes, never template literals
- FieldGroup + Field for forms, not div with space-y-\*
- InputGroupInput/InputGroupTextarea inside InputGroup
- ToggleGroup for 2–7 options, not Button loop
- data-invalid on Field, aria-invalid on control
- Icons: data-icon="inline-start/end", no sizing classes

### react-best-practices

- Promise.all() for independent async operations
- Avoid barrel file imports (import directly from source)
- Dynamic imports for heavy components: next/dynamic
- Auth check inside Server Actions (not just middleware)
- Hoist static I/O to module level
- Minimize RSC boundary serialization — pass only needed fields
- Use useTransition, useDeferredValue for non-urgent updates
- Avoid useEffect for derived state — compute during render

### vitest

- test/it functions, skip/only/concurrent modifiers
- vi.mock(), vi.fn(), vi.spyOn() for mocking
- toMatchSnapshot, toMatchInlineSnapshot
- beforeEach, afterEach, beforeAll, afterAll hooks

### accessibility

- alt text on all images
- aria-label on icon buttons
- Color contrast: 4.5:1 (AA), 7:1 (AAA)
- :focus-visible for keyboard focus indicators
- 24×24px minimum target size
- prefers-reduced-motion support
- form labels with htmlFor

### tailwind-v4-shadcn

- Define CSS variables at root level (NOT in @layer base)
- Wrap colors with hsl(): --background: hsl(0 0% 100%)
- Use @theme inline to map var(--color) to --color-background
- Delete tailwind.config.ts (v4 doesn't use it)
- Use @tailwindcss/vite plugin
- .dark class for dark mode, NOT dark: variants

### frontend-design

- Bold aesthetic direction before coding
- Typography: distinctive fonts, avoid Inter/Roboto/Arial
- Color: CSS variables, dominant + sharp accents
- Motion: CSS animations, animation-delay for orchestration
- Spatial: asymmetry, overlap, generous negative space

### seo

- Title tags: 50–60 chars, primary keyword near start
- Meta descriptions: 150–160 chars, unique per page
- Single h1 per page, logical heading hierarchy
- JSON-LD structured data (Organization, Article, Product, FAQ)
- Canonical URLs on all pages

### verification-before-completion

- NO completion claims without fresh verification evidence
- Before claiming status: identify command → run it → read output → verify → then claim

### test-driven-development

- NO production code without a failing test first
- Red-green-refactor cycle: write test → watch it fail → write minimal code to pass → refactor

### systematic-debugging

- NO fixes without root cause investigation first
- 4 phases: Root Cause Investigation → Hypothesis → Test Fix → Verify

### supabase-postgres-best-practices

- Use indexes on frequently queried columns
- Partial indexes for filtered queries
- EXPLAIN ANALYZE to analyze query plans
- Connection pooling for high concurrency
- Row-Level Security (RLS) for data access control

### stripe-best-practices

- Checkout Sessions for one-time payments
- Payment Element for custom embedded forms
- Setup Intents for saving payment methods
- Always use latest API version (2026-02-25.clover)

### frontend-skill

- Composition before components
- Full-bleed hero, cardless layouts
- Brand first, headline second, body third, CTA fourth
- Two typefaces max, one accent color default

---

## Next Steps

Run skill-registry again after installing or removing skills. Update this file when project conventions change.
