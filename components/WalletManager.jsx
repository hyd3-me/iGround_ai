// you are to ONLY import from importmap in index.html, export using window
import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';

function WalletManager() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [balances, setBalances] = useState({});
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);

  const { data: ethBalance } = useBalance({
    address: address,
    query: { enabled: !!address }
  });

  useEffect(() => {
    if (isConnected && address) {
      fetchTestnetBalances();
    }
  }, [isConnected, address]);

  const fetchTestnetBalances = async () => {
    if (!address) return;
    
    setIsLoadingBalances(true);
    const mockBalances = {};
    
    // Simulate fetching balances for different testnets
    const testnets = ['sepolia', 'mumbai', 'bsc-testnet', 'arbitrum-sepolia', 'optimism-sepolia', 'base-sepolia'];
    
    for (const testnet of testnets) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate random balance
      mockBalances[testnet] = {
        balance: (Math.random() * 10).toFixed(4),
        symbol: testnet.includes('sepolia') || testnet.includes('arbitrum') || testnet.includes('optimism') || testnet.includes('base') ? 'ETH' : 
                testnet.includes('mumbai') ? 'MATIC' : 'BNB'
      };
    }
    
    setBalances(mockBalances);
    setIsLoadingBalances(false);
  };

  if (!isConnected) {
    return (
      <div className="glass-morphism rounded-lg p-6 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-blue-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-white">Connect Your Wallet</h3>
          <p className="text-gray-400 mb-6">
            Connect your wallet to start collecting testnet tokens from multiple faucets
          </p>
        </div>

        <div className="space-y-3">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              className="w-full p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-sm border border-slate-600 hover:border-blue-500 flex items-center justify-center space-x-3"
            >
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" className="w-full h-full text-blue-400">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-lg font-medium text-white">
                {connector.name === 'Injected' ? 'MetaMask / Browser Wallet' : connector.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Wallet Connected
          </h3>
          <button
            onClick={() => disconnect()}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300 border border-red-500/30"
          >
            Disconnect
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
            <p className="font-mono text-white break-all">{address}</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Mainnet ETH Balance</p>
            <p className="text-xl font-bold text-green-400">
              {ethBalance ? `${parseFloat(ethBalance.formatted).toFixed(4)} ${ethBalance.symbol}` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-morphism rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Testnet Balances</h3>
          <button
            onClick={fetchTestnetBalances}
            disabled={isLoadingBalances}
            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300 border border-blue-500/30 flex items-center space-x-2"
          >
            {isLoadingBalances ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </>
            )}
          </button>
        </div>

        {isLoadingBalances ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-800/30 rounded-lg p-4 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-slate-600 rounded w-1/3"></div>
                  <div className="h-4 bg-slate-600 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(balances).map(([network, data]) => (
              <div key={network} className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400 capitalize">
                      {network.replace('-', ' ')}
                    </p>
                    <p className="text-lg font-bold text-white">
                      {data.balance} {data.symbol}
                    </p>
                  </div>
                  <div className="text-2xl">
                    {network.includes('sepolia') && '⟠'}
                    {network.includes('mumbai') && '⬟'}
                    {network.includes('bsc') && '🟡'}
                    {network.includes('arbitrum') && '🔵'}
                    {network.includes('optimism') && '🔴'}
                    {network.includes('base') && '🔷'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

window.WalletManager = WalletManager;
