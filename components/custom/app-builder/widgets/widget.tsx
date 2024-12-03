import React from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function Widget({ children, className }: { children: React.ReactNode, className?: string }){
  return (
    <Card className={cn('p-1 bg-inherit text-inherit', className)}>
      {children}
    </Card>
  );
};