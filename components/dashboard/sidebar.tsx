'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavigationItem } from '@/lib/dashboard/contracts';
import { Sheet, SheetContent } from '@/lib/ui/components';
import { cn } from '@/lib/utils';
import { navigation as navTokens } from '@/lib/ui/tokens';

const NAV_ARIA_LABEL = 'Navegación principal';

interface SidebarProps {
  id: string;
  navigation: NavigationItem[];
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ id, navigation, mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <>
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
                    navTokens.item,
                    active ? navTokens.itemActive : navTokens.itemInactive,
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
    </>
  );

  return (
    <>
      {/* Mobile: Sheet component with built-in overlay */}
      <Sheet open={mobileOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent
          id={id}
          side="left"
          className="w-[18rem] border-r bg-background p-4 md:hidden"
          aria-label={NAV_ARIA_LABEL}
        >
          {sidebarContent}
        </SheetContent>
      </Sheet>

      {/* Desktop: static sidebar */}
      <aside
        id={id}
        className="hidden bg-background p-4 md:block md:w-72"
        aria-label={NAV_ARIA_LABEL}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
