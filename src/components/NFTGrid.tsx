import React from 'react';
import type { NFTMetadata } from '../types';

interface NFTGridProps {
  nfts: NFTMetadata[];
  onSelect: (nft: NFTMetadata) => void;
}

export const NFTGrid: React.FC<NFTGridProps> = ({ nfts, onSelect }) => {
  if (!nfts.length) {
    return (
      <div className="nft-text-center nft-p-8">
        <p className="nft-text-gray-400">No NFTs found in this wallet.</p>
      </div>
    );
  }

  const handleNftClick = (nft: NFTMetadata) => {
    onSelect(nft);
  };

  return (
    <div className="nft-grid nft-grid-cols-2 md:nft-grid-cols-3 lg:nft-grid-cols-4 nft-gap-4">
      {nfts.map((nft, index) => (
        <div
          key={`${nft.contract?.address}-${nft.tokenId}-${index}`}
          className="nft-bg-gray-800 nft-rounded-lg nft-overflow-hidden nft-cursor-pointer hover:nft-transform hover:nft-scale-105 nft-transition-transform"
          onClick={() => handleNftClick(nft)}
        >
          <div className="nft-aspect-square nft-relative">
            <img
              src={nft.image}
              alt={nft.name || `NFT #${nft.tokenId}`}
              className="nft-w-full nft-h-full nft-object-cover"
            />
          </div>
          <div className="nft-p-4">
            <h3 className="nft-text-lg nft-font-semibold nft-truncate">
              {nft.name || `NFT #${nft.tokenId}`}
            </h3>
            {nft.description && (
              <p className="nft-text-sm nft-text-gray-400 nft-mt-1 nft-line-clamp-2">
                {nft.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
