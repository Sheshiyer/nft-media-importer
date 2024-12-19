import React, { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { MetaMaskLogin } from './components/MetaMaskLogin';
import { LoadingScreen } from './components/LoadingScreen';
import { NFTGrid } from './components/NFTGrid';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { useNFTFetcher } from './hooks/useNFTFetcher';
import './styles.css';

interface PluginState {
  provider: ethers.providers.Web3Provider | null;
  address: string | null;
  selectedNft: NFTMetadata | null;
}

export function NFTMediaImporter() {
  const [state, setState] = useState<PluginState>({
    provider: null,
    address: null,
    selectedNft: null
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { nfts, loading, error, fetchNFTs, verifyNFTOwnership } = useNFTFetcher();

  const handleConnect = useCallback(async (provider: ethers.providers.Web3Provider) => {
    try {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setState(prev => ({ ...prev, provider, address }));
      fetchNFTs(address);
    } catch (err) {
      console.error('Error getting signer address:', err);
      alert('Failed to connect wallet. Please try again.');
    }
  }, [fetchNFTs]);

  const handleNFTSelect = useCallback((nft: NFTMetadata) => {
    setState(prev => ({ ...prev, selectedNft: nft }));
    setShowConfirmation(true);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!state.selectedNft || !state.address) return;

    try {
      // Verify ownership before importing
      const isOwner = await verifyNFTOwnership(
        state.address,
        state.selectedNft.contract.address,
        state.selectedNft.tokenId
      );

      if (!isOwner) {
        alert('Ownership verification failed. Please try again.');
        return;
      }

      // Import to Framer's media library
      await window.$framer.addMedia({
        name: state.selectedNft.name || `NFT #${state.selectedNft.tokenId}`,
        url: state.selectedNft.image,
        type: 'image'
      });

      setShowConfirmation(false);
      setState(prev => ({ ...prev, selectedNft: null }));
      alert('NFT successfully imported to Framer!');
    } catch (err) {
      console.error('Error importing NFT:', err);
      alert('Failed to import NFT. Please try again.');
    }
  }, [state.selectedNft, state.address, verifyNFTOwnership]);

  const handleCancel = useCallback(() => {
    setShowConfirmation(false);
    setState(prev => ({ ...prev, selectedNft: null }));
  }, []);

  const handleRetry = useCallback(() => {
    if (state.address) {
      fetchNFTs(state.address);
    }
  }, [state.address, fetchNFTs]);

  if (!state.provider || !state.address) {
    return <MetaMaskLogin onConnect={handleConnect} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="nft-p-8 nft-text-center">
        <div className="nft-text-red-600 nft-mb-4">Error: {error}</div>
        <button
          onClick={handleRetry}
          className="nft-btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <NFTGrid nfts={nfts} onSelect={handleNFTSelect} />
      <ConfirmationScreen
        nft={state.selectedNft}
        isOpen={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

// Export for Framer
export default {
  title: "NFT Media Importer",
  component: NFTMediaImporter
};
