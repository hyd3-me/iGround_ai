// you are to ONLY import from importmap in index.html, export using window
import React, { useState } from 'react';

function FaucetCard({ faucet, network, onClaim }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, success, error, pending

  const handleClaim = async () => {
    setIsLoading(true);
    setStatus('pending');
    
    try {
      // Simulate API call to faucet
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      // Simulate random success/failure
      const success = Math.random() > 0.3;
      
      if (success) {
        setStatus('success');
        onClaim?.(faucet, network, 'success');
      } else {
        setStatus('error');
        onClaim?.(faucet, network, 'error');
      }
    } catch (error) {
      setStatus('error');
      onClaim?.(faucet, network, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'faucet-status-success';
      case 'error': return 'faucet-status-error';
      case 'pending': return 'faucet-status-pending';
      default: return 'bg-slate-700';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'pending': return '⏳';
      default: return '🚰';
    }
  };

  return (
    <div className="glass-morphism rounded-lg p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full ${getStatusColor()} flex items-center justify-center text-sm`}>
            {getStatusIcon()}
          </div>
          <div>
            <h4 className="font-medium text-white">{faucet.name}</h4>
            <p className="text-xs text-gray-400">{faucet.amount}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.open(faucet.url, '_blank')}
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
            title="Open faucet website"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
          
          <button
            onClick={handleClaim}
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Claiming...</span>
              </>
            ) : (
              <span>Claim</span>
            )}
          </button>
        </div>
      </div>

      {status !== 'idle' && (
        <div className={`mt-3 p-2 rounded text-xs ${
          status === 'success' ? 'bg-green-500/20 text-green-400' :
          status === 'error' ? 'bg-red-500/20 text-red-400' :
          'bg-yellow-500/20 text-yellow-400'
        }`}>
          {status === 'success' && 'Tokens claimed successfully!'}
          {status === 'error' && 'Failed to claim tokens. Try again later.'}
          {status === 'pending' && 'Claiming tokens...'}
        </div>
      )}
    </div>
  );
}

window.FaucetCard = FaucetCard;
