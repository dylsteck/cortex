'use client';
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';

export function useWagmiConfig() {
  const wagmiConfig = createConfig({
    chains: [base],
    // turn off injected provider discovery
    multiInjectedProviderDiscovery: false,
    connectors: [farcasterFrame()],
    ssr: true,
    transports: {
      [base.id]: http()
    },
  });

  return wagmiConfig;
}