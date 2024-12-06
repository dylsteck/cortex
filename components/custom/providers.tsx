'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { base } from 'viem/chains';

import FrameProvider from './frame-provider';
import { useWagmiConfig } from '../../lib/wagmi';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const wagmiConfig = useWagmiConfig();
  return (
    <OnchainKitProvider apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} chain={base}>
       <QueryClientProvider client={queryClient}>
          <FrameProvider>
            {children}
          </FrameProvider>
       </QueryClientProvider>
    </OnchainKitProvider>
  );
}
