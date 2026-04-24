import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const spacing = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
} as const;

export const padding = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
  xl: 'p-6',
} as const;

export const radius = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
} as const;

export const typography = {
  h1: 'text-2xl font-semibold',
  h2: 'text-xl font-semibold',
  h3: 'text-base font-medium',
  body: 'text-sm',
  small: 'text-xs',
  muted: 'text-muted-foreground',
} as const;

export const card = {
  base: 'rounded-md border border-border bg-card',
  section: 'rounded-md border border-border bg-card p-4',
} as const;

export const button = {
  base: 'rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors focus-visible:border-primary focus-visible:outline-none',
  hover: 'hover:border-primary/50 hover:bg-accent',
  active: 'bg-accent text-foreground',
} as const;

export const input = {
  base: 'rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors focus-visible:border-primary focus-visible:outline-none',
} as const;

export const navigation = {
  item: 'block rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none',
  itemActive: 'bg-accent text-foreground',
  itemInactive: 'text-muted-foreground hover:bg-accent hover:text-foreground',
} as const;
