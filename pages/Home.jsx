// you are to ONLY import from importmap in index.html, export using window
import React, { useState } from 'react';
import { useAccount } from 'wagmi';

function Home() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState('networks');
  const [selectedNetworks, setSelectedNetworks] = useState([]);

  const NetworkSelector = window.NetworkSelector;
  const FaucetCard = window.FaucetCard;
  const BatchCollector = window.BatchCollector;
  const WalletManager = window.WalletManager;

  const handleNetworkToggle = (networkId) => {
    setSelectedNetworks(prev => 
      prev.includes(networkId) 
        ? prev.filter(id => id !== networkId)
        : [...prev, networkId]
    );
  };

  const handleSelectAll = () => {
    setSelectedNetworks(window.TESTNET_NETWORKS.map(n => n.id));
  };

  const handleDeselectAll = () => {
    setSelectedNetworks([]);
  };

  const handleFaucetClaim = (faucet, network, status) => {
    console.log(`Faucet claim: ${faucet.name} on ${network.name} - ${status}`);
  };

  const tabs = [
    { id: 'networks', label: 'Select Networks', icon: '🌐' },
    { id: 'faucets', label: 'Individual Faucets', icon: '🚰' },
    { id: 'batch', label: 'Batch Collector', icon: '⚡' },
    { id: 'wallet', label: 'Wallet Manager', icon: '👛' }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4 animate-pulse-glow">
            TestNet Collector
          </h1>
          <p className="text-xl text-gray-300 animate-typing">
            Automate testnet token collection from multiple faucets
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Multi-network support</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Batch collection</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Real-time tracking</span>
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 glass-morphism rounded-lg p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-400 shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'networks' && (
            <NetworkSelector
              selectedNetworks={selectedNetworks}
              onNetworkToggle={handleNetworkToggle}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
            />
          )}

          {activeTab === 'faucets' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Individual Faucet Claims
              </h2>
              
              {selectedNetworks.length === 0 ? (
                <div className="glass-morphism rounded-lg p-8 text-center">
                  <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2 text-white">No Networks Selected</h3>
                  <p className="text-gray-400">Please select networks from the "Select Networks" tab first.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {window.TESTNET_NETWORKS
                    .filter(network => selectedNetworks.includes(network.id))
                    .map((network) => (
                      <div key={network.id} className="glass-morphism rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${network.color} flex items-center justify-center text-xl`}>
                            {network.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{network.name}</h3>
                            <p className="text-gray-400">{network.symbol} • {network.faucets.length} faucets available</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {network.faucets.map((faucet, index) => (
                            <FaucetCard
                              key={index}
                              faucet={faucet}
                              network={network}
                              onClaim={handleFaucetClaim}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'batch' && (
            <BatchCollector
              selectedNetworks={selectedNetworks}
              walletAddress={address}
            />
          )}

          {activeTab === 'wallet' && <WalletManager />}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-400">
          <p className="text-sm">
            ⚠️ This tool is for testnet purposes only. Never use real funds or mainnet addresses.
          </p>
          <p className="text-xs mt-2">
            Always verify faucet requirements and rate limits before claiming.
          </p>
        </div>
      </div>
    </div>
  );
}

window.Home = Home;
