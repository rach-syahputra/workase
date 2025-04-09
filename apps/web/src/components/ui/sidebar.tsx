import React from 'react';
import Link from 'next/link';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
  children: React.ReactNode;
}

interface SidebarGroupProps {
  className?: string;
  children: React.ReactNode;
}

interface SidebarLabelProps {
  className?: string;
  children: React.ReactNode;
}

interface SidebarMenuProps {
  className?: string;
  children: React.ReactNode;
}

interface SidebarMenuItemProps {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface SidebarMenuLinkProps {
  href: string;
  label: string;
  lucideIcon: React.ElementType;
  iconSize?: number;
  className?: string;
}

const Sidebar = ({ className, children }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'bg-primary-dark-background sticky top-0 hidden min-h-svh w-fit p-4 lg:block lg:w-[280px]',
        className,
      )}
    >
      {children}
    </aside>
  );
};

const SidebarGroup = ({ className, children }: SidebarGroupProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      {children}
    </div>
  );
};

const SidebarGroupLabel = ({ className, children }: SidebarLabelProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center py-2 text-sm font-semibold text-gray-400 lg:justify-start',
        className,
      )}
    >
      {children}
    </div>
  );
};

const SidebarMenu = ({ className, children }: SidebarMenuProps) => {
  return (
    <ul className={cn('flex w-full flex-col gap-2', className)}>{children}</ul>
  );
};

const SidebarMenuItem = ({
  asChild,
  className,
  children,
}: SidebarMenuItemProps) => {
  const Comp = asChild ? Slot : 'li';

  return (
    <Comp
      className={cn(
        'hover:bg-primary-blue-hover flex h-11 cursor-pointer select-none items-center gap-3 rounded-md px-4 text-sm text-white transition-all duration-150 ease-in',
        className,
      )}
    >
      {children}
    </Comp>
  );
};

const SidebarMenuLink = ({
  href,
  label,
  lucideIcon: Icon,
  iconSize,
  className,
}: SidebarMenuLinkProps) => {
  return (
    <Link href={href} aria-label={label} className={cn('w-full', className)}>
      <Icon size={iconSize || 18} />
      <span>{label}</span>
    </Link>
  );
};

export {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
};
