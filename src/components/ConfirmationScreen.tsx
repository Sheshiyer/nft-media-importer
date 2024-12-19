import React from 'react';
import { Dialog } from '@headlessui/react';

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
  if (!nft) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      className="nft-fixed nft-inset-0 nft-z-10 nft-overflow-y-auto"
    >
      <div className="nft-min-h-screen nft-px-4 nft-text-center">
        <div className="nft-fixed nft-inset-0 nft-bg-black/30" aria-hidden="true" />

        <span
          className="nft-inline-block nft-h-screen nft-align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <Dialog.Panel className="nft-inline-block nft-w-full nft-max-w-md nft-p-6 nft-my-8 nft-overflow-hidden nft-text-left nft-align-middle nft-transition-all nft-transform nft-bg-white nft-shadow-xl nft-rounded-2xl">
          <Dialog.Title
            as="h3"
            className="nft-text-lg nft-font-medium nft-leading-6 nft-text-gray-900"
          >
            Import NFT to Framer
          </Dialog.Title>

          <div className="nft-mt-4">
            <div className="nft-aspect-square nft-w-full nft-rounded-lg nft-overflow-hidden nft-mb-4 nft-bg-gray-100">
              <img
                src={nft.image}
                alt={nft.name || `NFT #${nft.tokenId}`}
                className="nft-w-full nft-h-full nft-object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Failed+to+load+NFT';
                }}
              />
            </div>

            <div className="nft-mb-4">
              <h4 className="nft-font-medium nft-text-gray-900">
                {nft.name || `NFT #${nft.tokenId}`}
              </h4>
              {nft.description && (
                <p className="nft-text-sm nft-text-gray-500 nft-mt-1 nft-line-clamp-3">
                  {nft.description}
                </p>
              )}
              <div className="nft-mt-2 nft-flex nft-items-center nft-text-xs nft-text-gray-500">
                <svg
                  className="nft-w-4 nft-h-4 nft-mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Token ID: {nft.tokenId}</span>
              </div>
            </div>

            <Dialog.Description className="nft-text-sm nft-text-gray-500 nft-mb-6">
              This NFT will be imported to your Framer project's media library.
              You can use it in your designs just like any other media asset.
            </Dialog.Description>

            <div className="nft-mt-6 nft-flex nft-justify-end nft-space-x-3">
              <button
                type="button"
                className="nft-btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="nft-btn-primary nft-flex nft-items-center nft-space-x-2"
                onClick={onConfirm}
              >
                <svg
                  className="nft-w-4 nft-h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span>Import to Framer</span>
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
