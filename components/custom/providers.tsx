'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { base } from 'viem/chains';
import { WagmiProvider } from 'wagmi';

import { wagmiConfig } from '@/lib/wagmi';

import FrameProvider from './frame-provider';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <OnchainKitProvider apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} chain={base}>
          <QueryClientProvider client={queryClient}>
              <FrameProvider>
                {children}
              </FrameProvider>
          </QueryClientProvider>
      </OnchainKitProvider>
    </WagmiProvider>
  );
}
