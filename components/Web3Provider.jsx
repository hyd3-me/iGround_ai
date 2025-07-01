// you are to ONLY import from importmap in index.html, export using window
import React from 'react';
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, goerli, polygon, polygonMumbai, bsc, bscTestnet, arbitrum, arbitrumSepolia, optimism, optimismSepolia, base, baseSepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const config = createConfig({
  chains: [
    mainnet, 
    sepolia, 
    goerli, 
    polygon, 
    polygonMumbai, 
    bsc, 
    bscTestnet, 
    arbitrum, 
    arbitrumSepolia, 
    optimism, 
    optimismSepolia, 
    base, 
    baseSepolia
  ],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http(),
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
    [optimism.id]: http(),
    [optimismSepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

window.Web3Provider = Web3Provider;
