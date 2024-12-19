import React from 'react';
import { ethers } from 'ethers';

interface MetaMaskLoginProps {
  onConnect: (provider: ethers.providers.Web3Provider) => void;
}

export const MetaMaskLogin: React.FC<MetaMaskLoginProps> = ({ onConnect }) => {
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask to use this plugin');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      onConnect(provider);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Failed to connect to MetaMask. Please try again.');
    }
  };

  return (
    <div className="nft-flex nft-flex-col nft-items-center nft-justify-center nft-min-h-400 nft-p-8 nft-space-y-6">
      <div className="nft-w-24 nft-h-24">
        <img 
          src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
          alt="MetaMask Logo"
          className="nft-w-full nft-h-full nft-object-contain"
        />
      </div>
      <h1 className="nft-text-2xl nft-font-bold nft-text-gray-800">
        NFT Media Importer
      </h1>
      <p className="nft-text-gray-600 nft-text-center nft-max-w-md">
        Import your NFT media directly into Framer. Connect your wallet to get started.
      </p>
      <button
        onClick={connectWallet}
        className="nft-btn-primary nft-flex nft-items-center nft-space-x-2"
      >
        <svg
          className="nft-w-5 nft-h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span>Connect MetaMask</span>
      </button>
    </div>
  );
};
