import React, { useState, useCallback } from 'react';
import { MetaMaskLogin } from './components/MetaMaskLogin';
import { LoadingScreen } from './components/LoadingScreen';
import { NFTGrid } from './components/NFTGrid';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { useNFTFetcher } from './hooks/useNFTFetcher';
import './styles.css';
export function NFTMediaImporter() {
    const [state, setState] = useState({
        provider: null,
        address: null,
        selectedNft: null
    });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { nfts, loading, error, fetchNFTs, verifyNFTOwnership } = useNFTFetcher();
    const handleConnect = useCallback(async (provider) => {
        try {
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setState(prev => (Object.assign(Object.assign({}, prev), { provider, address })));
            fetchNFTs(address);
        }
        catch (err) {
            console.error('Error getting signer address:', err);
            alert('Failed to connect wallet. Please try again.');
        }
    }, [fetchNFTs]);
    const handleNFTSelect = useCallback((nft) => {
        setState(prev => (Object.assign(Object.assign({}, prev), { selectedNft: nft })));
        setShowConfirmation(true);
    }, []);
    const handleConfirm = useCallback(async () => {
        if (!state.selectedNft || !state.address)
            return;
        try {
            // Verify ownership before importing
            const isOwner = await verifyNFTOwnership(state.address, state.selectedNft.contract.address, state.selectedNft.tokenId);
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
            setState(prev => (Object.assign(Object.assign({}, prev), { selectedNft: null })));
            alert('NFT successfully imported to Framer!');
        }
        catch (err) {
            console.error('Error importing NFT:', err);
            alert('Failed to import NFT. Please try again.');
        }
    }, [state.selectedNft, state.address, verifyNFTOwnership]);
    const handleCancel = useCallback(() => {
        setShowConfirmation(false);
        setState(prev => (Object.assign(Object.assign({}, prev), { selectedNft: null })));
    }, []);
    const handleRetry = useCallback(() => {
        if (state.address) {
            fetchNFTs(state.address);
        }
    }, [state.address, fetchNFTs]);
    if (!state.provider || !state.address) {
        return React.createElement(MetaMaskLogin, { onConnect: handleConnect });
    }
    if (loading) {
        return React.createElement(LoadingScreen, null);
    }
    if (error) {
        return (React.createElement("div", { className: "nft-p-8 nft-text-center" },
            React.createElement("div", { className: "nft-text-red-600 nft-mb-4" },
                "Error: ",
                error),
            React.createElement("button", { onClick: handleRetry, className: "nft-btn-primary" }, "Retry")));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(NFTGrid, { nfts: nfts, onSelect: handleNFTSelect }),
        React.createElement(ConfirmationScreen, { nft: state.selectedNft, isOpen: showConfirmation, onConfirm: handleConfirm, onCancel: handleCancel })));
}
// Export for Framer
export default {
    title: "NFT Media Importer",
    component: NFTMediaImporter
};
