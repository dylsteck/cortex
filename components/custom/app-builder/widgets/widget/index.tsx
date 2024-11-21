import React from 'react';

import { cn } from '@/lib/utils';

const BaseWidget = ({ size, children }: { size: 'small' | 'large', children: React.ReactNode }) => {
  return (
    <div className={cn('flex items-center justify-center bg-gray-200 border border-gray-300 shadow-md m-2', {
      'w-24 h-24': size === 'small',
      'w-48 h-24 rounded-lg': size === 'large',
    })}>
      {children}
    </div>
  );
};

export const SmallWidget = ({ children }: { children: React.ReactNode }) => {
  return <BaseWidget size="small">{children}</BaseWidget>;
};

export const LargeWidget = ({ children }: { children: React.ReactNode }) => {
  return <BaseWidget size="large">{children}</BaseWidget>;
};