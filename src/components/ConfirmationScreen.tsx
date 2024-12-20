import React from 'react';
import type { NFTMetadata } from '../types';

interface ConfirmationScreenProps {
  nft: NFTMetadata | null;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  nft,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !nft) return null;

  return (
    <div className="nft-fixed nft-inset-0 nft-bg-black/50 nft-flex nft-items-center nft-justify-center nft-z-50">
      <div className="nft-bg-gray-900 nft-rounded-xl nft-p-6 nft-max-w-md nft-w-full nft-mx-4">
        <h2 className="nft-text-xl nft-font-bold nft-mb-4">Confirm Import</h2>
        <p className="nft-text-gray-300 nft-mb-4">
          Are you sure you want to import this NFT to your Framer project?
        </p>
        <div className="nft-flex nft-justify-between nft-gap-4">
          <button
            onClick={onCancel}
            className="nft-flex-1 nft-px-4 nft-py-2 nft-bg-gray-700 nft-rounded-lg hover:nft-bg-gray-600 nft-transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="nft-flex-1 nft-px-4 nft-py-2 nft-bg-blue-600 nft-rounded-lg hover:nft-bg-blue-500 nft-transition-colors"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};
