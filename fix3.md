# Fix 3: Transiciones Suaves y Profesionales

## Problema

La aplicación carece de transiciones y animaciones suaves que mejoren la experiencia de usuario. Aunque `framer-motion` está instalado, solo se usa en `DrilldownPanel`. El resto de la UI se siente abrupta:

- **Sin animación de entrada**: KPIs, widgets y tablas aparecen instantáneamente
- **Sin micro-interacciones**: Hover y clicks no tienen feedback visual
- **Sin transición de tema**: El cambio dark/light es instantáneo, no suave
- **Sin staggered animations**: Los elementos no se revelan de forma escalonada

## Usuario

- Quiere mejorar UX con transiciones suaves y profesionales
- Estilo moderado (~200-350ms, efectos sutiles pero visibles)
- Todas las áreas (KPI, Widgets, Modal, Filtros, Tema)

## Solución

Implementar animaciones sutiles usando `framer-motion` donde ya está instalado, y CSS transitions para el tema global.

---

## Implementación

### 1. Tema Dark/Light — `app/globals.css`

**Problema**: Cambio de tema instantáneo, sin transición.

**Solución**: Agregar transición CSS global para colores de fondo, bordes y texto.

```css
@layer base {
  * {
    @apply border-border;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease,
      color 0.25s ease;
  }
}
```

**Excluir**: Focus rings y elementos que requieren respuesta instantánea.

**Contexto**: El tema ya usa CSS variables (`hsl(var(--background))`), solo necesitamos agregar `transition` al selector base. El `prefers-reduced-motion` ya está manejado en línea 67-76.

---

### 2. KPI Bar — `components/dashboard/kpi-bar.tsx`

**Problema**: Sin animación de entrada, números estáticos.

**Estado actual** (`kpi-bar.tsx:14-40`):

```tsx
{kpis.map((kpi) => (
  <Card key={kpi.id} className={`p-4 ${toneClassMap[kpi.tone]}`}>
    <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
    <p className="mt-1 text-2xl font-bold tabular-nums">
      {kpi.value.toLocaleString('es-CL')}
      ...
```

**Solución**:

1. Envolver cada `Card` con `motion.div` para animación staggered
2. Animación: `initial={{ opacity: 0, y: 10 }}` → `animate={{ opacity: 1, y: 0 }}`
3. Stagger: `transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}`
4. Contador animado con `useMotionValue` + `animate()` para valores numéricos

**Archivo**: `components/dashboard/kpi-bar.tsx`

---

### 3. Widgets Grid — `components/dashboard/widgets-section.tsx`

**Problema**: Hover básico (`transition-colors`), sin feedback de click.

**Estado actual** (`widgets-section.tsx:39`):

```tsx
className = '...transition-colors hover:border-primary/50 hover:bg-accent...';
```

**Solución**:

1. Mejorar hover: `hover:scale-[1.02] hover:shadow-md transition-all duration-200`
2. Feedback click: `active:scale-[0.98]`
3. Envolver widgets con `motion.div` + staggered entrance

**Archivo**: `components/dashboard/widgets-section.tsx`

---

### 4. Modal/Casos — `components/dashboard/cases-modal.tsx`

**Problema**: Animación CSS del Dialog (Radix) vs想要的 más control con framer-motion.

**Estado actual** (`cases-modal.tsx:32-106`):

```tsx
<Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
  <DialogContent className="max-w-5xl... max-h-[90vh] w-full">
    ...
  </DialogContent>
</Dialog>
```

**Solución**:

1. Envolver `DialogContent` con `AnimatePresence`
2. Agregar `motion.div` wrapper con animación:
   - Open: `initial={{ opacity: 0, scale: 0.95 }}` → `animate={{ opacity: 1, scale: 1 }}`
   - Close: reverse
   - Duration: 0.25s, ease: `easeOut`
3. Respetar `prefers-reduced-motion`

**Archivo**: `components/dashboard/cases-modal.tsx`

---

### 5. Modal Table — `components/dashboard/modal-table.tsx`

**Problema**: Filas sin animación, sin hover states.

**Estado actual** (`modal-table.tsx:52-65`):

```tsx
<TableRow key={row.id}>
  {schema.columns.map((column) => (
    <TableCell ...>
```

**Solución**:

1. Envolver `TableRow` con `motion.tr`
2. Stagger entrance: `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}` con delay basado en row index
3. Hover: `whileHover={{ backgroundColor: 'hsl(var(--accent))' }}`
4. Transition: `transition={{ duration: 0.15 }}`

**Archivo**: `components/dashboard/modal-table.tsx`

---

## Archivos a modificar

| Archivo                                    | Cambio                           |
| ------------------------------------------ | -------------------------------- |
| `app/globals.css`                          | Transición global tema (CSS)     |
| `components/dashboard/kpi-bar.tsx`         | Motion entrance + count-up       |
| `components/dashboard/widgets-section.tsx` | Hover/click/ entrance animations |
| `components/dashboard/cases-modal.tsx`     | AnimatePresence + dialog motion  |
| `components/dashboard/modal-table.tsx`     | Row stagger + hover states       |

## No se modifica

- `components/ui/dialog.tsx` — Mantiene animación CSS base, se mejora en `cases-modal.tsx`
- `DrilldownPanel` — Ya tiene animaciones (fuera de scope)
- `components/ui/select.tsx` — Radix maneja sus propias animaciones

## Verificación

```bash
npm run lint && npm run typecheck && npm run test
```

Manual:

1. Tema dark/light transiciona suavemente (0.25s)
2. KPIs entran con stagger al cargar
3. Widgets tienen hover con scale + shadow
4. Modal abre con scale+opacity suaves
5. Tabla tiene filas con stagger y hover highlight

## Dependencias

Ya instaladas:

- `framer-motion@^12.38.0`

No requiere nuevas dependencias.
