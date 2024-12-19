import React from 'react';
import { Oval } from 'react-loading-icons';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Fetching your NFTs...' 
}) => {
  return (
    <div className="nft-flex nft-flex-col nft-items-center nft-justify-center nft-min-h-400 nft-p-8 nft-space-y-4">
      <div className="nft-w-24 nft-h-24 nft-relative">
        <Oval 
          stroke="#2563eb"
          strokeWidth={3}
          speed={1.5}
          className="nft-w-full nft-h-full"
        />
        <div className="nft-absolute nft-inset-0 nft-flex nft-items-center nft-justify-center">
          <div className="nft-w-12 nft-h-12 nft-bg-blue-100 nft-rounded-full nft-animate-pulse-slow" />
        </div>
      </div>
      <p className="nft-text-gray-600 nft-text-lg nft-text-center nft-animate-pulse">
        {message}
      </p>
      <div className="nft-text-sm nft-text-gray-500 nft-mt-4">
        This may take a moment while we fetch your NFTs from multiple chains...
      </div>
      <div className="nft-flex nft-space-x-2 nft-mt-6">
        <div className="nft-flex nft-items-center nft-space-x-1">
          <div className="nft-w-2 nft-h-2 nft-bg-blue-500 nft-rounded-full" />
          <span className="nft-text-xs nft-text-gray-500">Ethereum</span>
        </div>
        <div className="nft-flex nft-items-center nft-space-x-1">
          <div className="nft-w-2 nft-h-2 nft-bg-purple-500 nft-rounded-full" />
          <span className="nft-text-xs nft-text-gray-500">Polygon</span>
        </div>
      </div>
    </div>
  );
};
