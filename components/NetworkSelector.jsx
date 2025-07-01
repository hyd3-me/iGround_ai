// you are to ONLY import from importmap in index.html, export using window
import React, { useState } from 'react';

const TESTNET_NETWORKS = [
  {
    id: 'sepolia',
    name: 'Ethereum Sepolia',
    chainId: 11155111,
    symbol: 'ETH',
    icon: '⟠',
    color: 'from-blue-500 to-blue-600',
    faucets: [
      { name: 'Alchemy Faucet', url: 'https://www.alchemy.com/faucets/ethereum-sepolia', amount: '1 ETH/day' },
      { name: 'QuickNode Faucet', url: 'https://faucet.quicknode.com/ethereum/sepolia', amount: '0.05 ETH/day' },
      { name: 'Blast API Faucet', url: 'https://blastapi.io/faucets/ethereum-sepolia', amount: '0.025 ETH/day' }
    ]
  },
  {
    id: 'goerli',
    name: 'Ethereum Goerli',
    chainId: 5,
    symbol: 'ETH',
    icon: '⟠',
    color: 'from-purple-500 to-purple-600',
    faucets: [
      { name: 'Goerli Faucet', url: 'https://goerlifaucet.com/', amount: '0.05 ETH/day' },
      { name: 'Paradigm Faucet', url: 'https://faucet.paradigm.xyz/', amount: '1 ETH/day' }
    ]
  },
  {
    id: 'mumbai',
    name: 'Polygon Mumbai',
    chainId: 80001,
    symbol: 'MATIC',
    icon: '⬟',
    color: 'from-purple-600 to-pink-600',
    faucets: [
      { name: 'Polygon Faucet', url: 'https://faucet.polygon.technology/', amount: '0.2 MATIC/day' },
      { name: 'Alchemy Faucet', url: 'https://www.alchemy.com/faucets/polygon-mumbai', amount: '0.5 MATIC/day' }
    ]
  },
  {
    id: 'bsc-testnet',
    name: 'BSC Testnet',
    chainId: 97,
    symbol: 'BNB',
    icon: '🟡',
    color: 'from-yellow-500 to-orange-500',
    faucets: [
      { name: 'BSC Faucet', url: 'https://testnet.bnbchain.org/faucet-smart', amount: '0.1 BNB/day' },
      { name: 'QuickNode Faucet', url: 'https://faucet.quicknode.com/binance-smart-chain/bnb-testnet', amount: '0.05 BNB/day' }
    ]
  },
  {
    id: 'arbitrum-sepolia',
    name: 'Arbitrum Sepolia',
    chainId: 421614,
    symbol: 'ETH',
    icon: '🔵',
    color: 'from-blue-600 to-cyan-600',
    faucets: [
      { name: 'Arbitrum Faucet', url: 'https://faucet.arbitrum.io/', amount: '0.1 ETH/day' },
      { name: 'Alchemy Faucet', url: 'https://www.alchemy.com/faucets/arbitrum-sepolia', amount: '0.5 ETH/day' }
    ]
  },
  {
    id: 'optimism-sepolia',
    name: 'Optimism Sepolia',
    chainId: 11155420,
    symbol: 'ETH',
    icon: '🔴',
    color: 'from-red-500 to-pink-500',
    faucets: [
      { name: 'Optimism Faucet', url: 'https://app.optimism.io/faucet', amount: '0.1 ETH/day' },
      { name: 'Alchemy Faucet', url: 'https://www.alchemy.com/faucets/optimism-sepolia', amount: '0.5 ETH/day' }
    ]
  },
  {
    id: 'base-sepolia',
    name: 'Base Sepolia',
    chainId: 84532,
    symbol: 'ETH',
    icon: '🔷',
    color: 'from-blue-400 to-blue-500',
    faucets: [
      { name: 'Base Faucet', url: 'https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet', amount: '0.1 ETH/day' },
      { name: 'Alchemy Faucet', url: 'https://www.alchemy.com/faucets/base-sepolia', amount: '0.5 ETH/day' }
    ]
  }
];

function NetworkSelector({ selectedNetworks, onNetworkToggle, onSelectAll, onDeselectAll }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNetworks = TESTNET_NETWORKS.filter(network =>
    network.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    network.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Select Testnet Networks
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={onSelectAll}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Select All
          </button>
          <button
            onClick={onDeselectAll}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Deselect All
          </button>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search networks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/50 rounded-lg border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
        />
        <svg
          className="absolute right-3 top-3 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNetworks.map((network) => (
          <div
            key={network.id}
            onClick={() => onNetworkToggle(network.id)}
            className={`network-card glass-morphism rounded-lg p-4 cursor-pointer transition-all duration-300 ${
              selectedNetworks.includes(network.id)
                ? 'ring-2 ring-blue-500 bg-blue-500/10'
                : 'hover:bg-slate-700/30'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${network.color} flex items-center justify-center text-xl`}>
                  {network.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{network.name}</h3>
                  <p className="text-sm text-gray-400">{network.symbol}</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                selectedNetworks.includes(network.id)
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-400'
              }`}>
                {selectedNetworks.includes(network.id) && (
                  <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 font-medium">Available Faucets:</p>
              {network.faucets.map((faucet, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <span className="text-gray-300">{faucet.name}</span>
                  <span className="text-blue-400">{faucet.amount}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredNetworks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No networks found matching your search.</p>
        </div>
      )}
    </div>
  );
}

window.NetworkSelector = NetworkSelector;
window.TESTNET_NETWORKS = TESTNET_NETWORKS;
