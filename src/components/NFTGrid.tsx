import React, { useState } from 'react';
import Masonry from 'react-masonry-css';

interface NFTGridProps {
  nfts: NFTMetadata[];
  onSelect: (nft: NFTMetadata) => void;
}

export const NFTGrid: React.FC<NFTGridProps> = ({ nfts, onSelect }) => {
  const [selectedNft, setSelectedNft] = useState<string | null>(null);

  const breakpointColumns = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  const handleNftClick = (nft: NFTMetadata) => {
    setSelectedNft(nft.tokenId);
    onSelect(nft);
  };

  if (nfts.length === 0) {
    return (
      <div className="nft-flex nft-flex-col nft-items-center nft-justify-center nft-min-h-400 nft-p-8">
        <div className="nft-text-center nft-bg-white/5 nft-rounded-2xl nft-p-8 nft-backdrop-blur-sm">
          <svg
            className="nft-w-16 nft-h-16 nft-mx-auto nft-mb-4 nft-gradient-text"
            fill="none"
            stroke="url(#gradient-nft)"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="nft-text-xl nft-font-medium nft-gradient-text">No NFTs Found</p>
          <p className="nft-mt-2 nft-text-gray-400">
            We couldn't find any NFTs in your connected wallet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="nft-p-4">
      <h2 className="nft-text-2xl nft-font-bold nft-mb-6 nft-gradient-text">Your NFT Collection</h2>
      <Masonry
        breakpointCols={breakpointColumns}
        className="nft-masonry-grid"
        columnClassName="nft-masonry-column"
      >
        {nfts.map((nft) => (
          <div
            key={`${nft.contract.address}-${nft.tokenId}`}
            className={`nft-card nft-mb-4 nft-cursor-pointer nft-group ${
              selectedNft === nft.tokenId ? 'nft-ring-4 nft-ring-nft-purple/50' : ''
            }`}
            onClick={() => handleNftClick(nft)}
          >
            <div className="nft-image-container nft-group-hover:nft-shadow-lg nft-transition-all">
              <div className="nft-absolute nft-inset-0 nft-bg-gradient-nft nft-opacity-0 nft-group-hover:nft-opacity-10 nft-transition-opacity" />
              <img
                src={nft.image}
                alt={nft.name || `NFT #${nft.tokenId}`}
                className="nft-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Failed+to+load+NFT';
                }}
              />
              <div className="nft-image-overlay nft-backdrop-blur-sm">
                <h3 className="nft-title nft-font-medium">
                  {nft.name || `NFT #${nft.tokenId}`}
                </h3>
                {nft.contract.name && (
                  <p className="nft-subtitle nft-flex nft-items-center nft-space-x-1">
                    <span className="nft-w-2 nft-h-2 nft-rounded-full nft-bg-gradient-nft" />
                    <span>{nft.contract.name}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Masonry>
      <div className="nft-mt-8 nft-text-center nft-text-sm nft-text-gray-400 nft-bg-white/5 nft-rounded-full nft-py-2 nft-px-4 nft-backdrop-blur-sm nft-max-w-md nft-mx-auto">
        Click on an NFT to import it to your Framer project
      </div>

      {/* SVG Gradient Definition */}
      <svg width="0" height="0" className="nft-hidden">
        <defs>
          <linearGradient id="gradient-nft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
