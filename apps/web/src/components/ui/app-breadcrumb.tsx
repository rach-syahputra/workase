import React from 'react';

import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/shadcn-ui/breadcrumb';

interface AppBreadCrumbProps {
  items: {
    href: string;
    label: string;
  }[];
  className?: string;
}

const AppBreadCrumb = ({ items, className }: AppBreadCrumbProps) => {
  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {items?.length > 0 &&
          items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {index !== items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadCrumb;
