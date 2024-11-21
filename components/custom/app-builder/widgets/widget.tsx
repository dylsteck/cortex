import React from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const BaseWidget = ({ size, children, className }: { size: 'small' | 'large', children: React.ReactNode, className?: string }) => {
  return (
    <Card className={cn('p-1 bg-inherit text-inherit', className, {
      'size-[30%]': size === 'small',
      'w-[60%] h-[40%] rounded-lg': size === 'large',
    })}>
      {children}
    </Card>
  );
};

export const SmallWidget = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <BaseWidget size="small" className={className}>{children}</BaseWidget>;
};

export const LargeWidget = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <BaseWidget size="large" className={className}>{children}</BaseWidget>;
};