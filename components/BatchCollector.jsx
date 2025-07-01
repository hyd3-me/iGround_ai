// you are to ONLY import from importmap in index.html, export using window
import React, { useState } from 'react';

function BatchCollector({ selectedNetworks, walletAddress }) {
  const [isCollecting, setIsCollecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleBatchCollect = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }

    if (selectedNetworks.length === 0) {
      alert('Please select at least one network');
      return;
    }

    setIsCollecting(true);
    setProgress(0);
    setResults([]);
    setShowResults(false);

    const networks = window.TESTNET_NETWORKS.filter(n => selectedNetworks.includes(n.id));
    const totalFaucets = networks.reduce((acc, network) => acc + network.faucets.length, 0);
    let completed = 0;
    const batchResults = [];

    for (const network of networks) {
      for (const faucet of network.faucets) {
        try {
          // Simulate API call with random delay
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
          
          // Simulate random success/failure
          const success = Math.random() > 0.25;
          
          const result = {
            network: network.name,
            faucet: faucet.name,
            status: success ? 'success' : 'error',
            amount: success ? faucet.amount : null,
            timestamp: new Date().toLocaleTimeString()
          };
          
          batchResults.push(result);
          completed++;
          setProgress((completed / totalFaucets) * 100);
          
          // Update results in real-time
          setResults([...batchResults]);
          
        } catch (error) {
          const result = {
            network: network.name,
            faucet: faucet.name,
            status: 'error',
            amount: null,
            timestamp: new Date().toLocaleTimeString()
          };
          
          batchResults.push(result);
          completed++;
          setProgress((completed / totalFaucets) * 100);
          setResults([...batchResults]);
        }
      }
    }

    setIsCollecting(false);
    setShowResults(true);
  };

  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-lg p-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
          Batch Token Collector
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Selected Networks</p>
            <p className="text-2xl font-bold text-blue-400">{selectedNetworks.length}</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Total Faucets</p>
            <p className="text-2xl font-bold text-green-400">
              {window.TESTNET_NETWORKS
                .filter(n => selectedNetworks.includes(n.id))
                .reduce((acc, network) => acc + network.faucets.length, 0)}
            </p>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Wallet Connected</p>
            <p className="text-sm font-mono text-yellow-400">
              {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Not connected'}
            </p>
          </div>
        </div>

        {isCollecting && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-blue-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onClick={handleBatchCollect}
          disabled={isCollecting || selectedNetworks.length === 0 || !walletAddress}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {isCollecting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Collecting Tokens...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Start Batch Collection</span>
            </>
          )}
        </button>
      </div>

      {(showResults || isCollecting) && results.length > 0 && (
        <div className="glass-morphism rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Collection Results</h3>
            <div className="flex space-x-4">
              <span className="text-sm text-green-400">✅ {successCount} Success</span>
              <span className="text-sm text-red-400">❌ {errorCount} Failed</span>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  result.status === 'success' 
                    ? 'bg-green-500/10 border-green-500' 
                    : 'bg-red-500/10 border-red-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">
                      {result.network} - {result.faucet}
                    </p>
                    {result.amount && (
                      <p className="text-sm text-green-400">Claimed: {result.amount}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      result.status === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {result.status === 'success' ? 'Success' : 'Failed'}
                    </p>
                    <p className="text-xs text-gray-400">{result.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

window.BatchCollector = BatchCollector;
