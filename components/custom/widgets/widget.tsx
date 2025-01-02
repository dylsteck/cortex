import React from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function Widget({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <Card className={cn(
      'p-2 sm:p-3 bg-white dark:bg-black text-black dark:text-white w-full h-full overflow-y-auto max-h-[80vh] sm:max-h-full sm:aspect-square rounded-lg',
      className
    )}>
      <div className="min-h-0 size-full">
        {children}
      </div>
    </Card>
  );
}