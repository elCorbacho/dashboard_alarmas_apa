import type { KpiMetric } from '@/lib/dashboard/contracts';

interface KpiBarProps {
  kpis: KpiMetric[];
}

const toneClassMap: Record<KpiMetric['tone'], string> = {
  default: 'border-border',
  warning: 'border-op-warning/60',
  critical: 'border-op-danger/60',
};

export function KpiBar({ kpis }: KpiBarProps) {
  return (
    <section
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      aria-label="Indicadores clave"
    >
      {kpis.map((kpi) => (
        <article
          key={kpi.id}
          className={`rounded-md border bg-card p-4 ${toneClassMap[kpi.tone]}`}
          aria-label={kpi.label}
        >
          <p className="text-sm font-medium text-muted-foreground">
            {kpi.label}
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums">
            {kpi.value.toLocaleString('es-CL')}
            {kpi.unit ? (
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                {kpi.unit}
              </span>
            ) : null}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{kpi.subtext}</p>
        </article>
      ))}
    </section>
  );
}
