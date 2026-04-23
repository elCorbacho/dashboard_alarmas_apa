'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavigationItem } from '@/lib/dashboard/contracts';
import { cn } from '@/lib/utils';
import { navigation } from '@/lib/ui/tokens';

interface SidebarProps {
  id: string;
  navigation: NavigationItem[];
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ id, navigation, mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        id={id}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[18rem] border-r border-border bg-background p-4 transition-transform md:static md:z-auto md:w-72 md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Navegación principal"
      >
        <div className="mb-6 space-y-1">
          <p className="text-xs text-muted-foreground">BI4H</p>
          <h2 className="text-lg font-bold">Dashboard APA</h2>
        </div>

        <nav>
          <ul className="grid gap-2">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      navigation.item,
                      active
                        ? navigation.itemActive
                        : navigation.itemInactive,
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
