// you are to ONLY import from importmap in index.html, export using window
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkDependencies = () => {
      if (
        window.Web3Provider &&
        window.NetworkSelector &&
        window.FaucetCard &&
        window.BatchCollector &&
        window.WalletManager &&
        window.Home
      ) {
        setIsReady(true);
      }
    };

    checkDependencies();
    const interval = setInterval(checkDependencies, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-gray-300 text-lg">Loading TestNet Collector...</p>
      </div>
    );
  }

  return (
    <window.Web3Provider>
      <window.Home />
    </window.Web3Provider>
  );
}

createRoot(document.getElementById('renderDiv')).render(<App />);
