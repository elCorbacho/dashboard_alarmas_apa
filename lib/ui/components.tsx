'use client';

import { cn } from '@/lib/utils';
import { spacing, typography, card, navigation } from './tokens';

// Re-export shadcn components
export {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@/components/ui/select';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
export { Separator } from '@/components/ui/separator';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'base' | 'section';
}

export function Card({ children, className, variant = 'base' }: CardProps) {
  return <div className={cn(card[variant], className)}>{children}</div>;
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: keyof typeof spacing;
}

export function Section({
  children,
  className,
  spacing: space = 'lg',
}: SectionProps) {
  return (
    <section className={cn(spacing[space], className)}>{children}</section>
  );
}

interface TitleProps {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export function Title({ children, level = 'h2', className }: TitleProps) {
  const Component = level;
  return (
    <Component className={cn(typography[level], className)}>
      {children}
    </Component>
  );
}

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Subtitle({ children, className }: SubtitleProps) {
  return (
    <p className={cn(typography.body, typography.muted, className)}>
      {children}
    </p>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'muted';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        variant === 'default'
          ? 'bg-primary/10 text-primary'
          : 'bg-muted text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

import Link from 'next/link';

export function NavLink({
  href,
  children,
  active,
  onClick,
  className,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        navigation.item,
        active ? navigation.itemActive : navigation.itemInactive,
        className,
      )}
    >
      {children}
    </Link>
  );
}

interface NavListProps {
  children: React.ReactNode;
  className?: string;
}

export function NavList({ children, className }: NavListProps) {
  return <nav className={cn('grid gap-2', className)}>{children}</nav>;
}
