import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
export const NFTGrid = ({ nfts, onSelect }) => {
    const [selectedNft, setSelectedNft] = useState(null);
    const breakpointColumns = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };
    const handleNftClick = (nft) => {
        setSelectedNft(nft.tokenId);
        onSelect(nft);
    };
    if (nfts.length === 0) {
        return (React.createElement("div", { className: "nft-flex nft-flex-col nft-items-center nft-justify-center nft-min-h-400 nft-p-8" },
            React.createElement("div", { className: "nft-text-gray-500 nft-text-center" },
                React.createElement("svg", { className: "nft-w-16 nft-h-16 nft-mx-auto nft-mb-4 nft-text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" })),
                React.createElement("p", { className: "nft-text-xl nft-font-medium" }, "No NFTs Found"),
                React.createElement("p", { className: "nft-mt-2 nft-text-gray-400" }, "We couldn't find any NFTs in your connected wallet"))));
    }
    return (React.createElement("div", { className: "nft-p-4" },
        React.createElement("h2", { className: "nft-text-xl nft-font-semibold nft-mb-4" }, "Your NFT Collection"),
        React.createElement(Masonry, { breakpointCols: breakpointColumns, className: "nft-masonry-grid", columnClassName: "nft-masonry-column" }, nfts.map((nft) => (React.createElement("div", { key: `${nft.contract.address}-${nft.tokenId}`, className: `nft-card nft-mb-4 nft-cursor-pointer ${selectedNft === nft.tokenId ? 'nft-card-selected' : ''}`, onClick: () => handleNftClick(nft) },
            React.createElement("div", { className: "nft-image-container" },
                React.createElement("img", { src: nft.image, alt: nft.name || `NFT #${nft.tokenId}`, className: "nft-image", onError: (e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=Failed+to+load+NFT';
                    } }),
                React.createElement("div", { className: "nft-image-overlay" },
                    React.createElement("h3", { className: "nft-title" }, nft.name || `NFT #${nft.tokenId}`),
                    nft.contract.name && (React.createElement("p", { className: "nft-subtitle" }, nft.contract.name)))))))),
        React.createElement("div", { className: "nft-mt-4 nft-text-center nft-text-sm nft-text-gray-500" }, "Click on an NFT to import it to your Framer project")));
};
