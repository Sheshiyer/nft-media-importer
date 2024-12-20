import React from 'react';
import { ethers } from 'ethers';
export const MetaMaskLogin = ({ onConnect }) => {
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask to use this plugin');
                return;
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            onConnect(provider);
        }
        catch (error) {
            console.error('Error connecting to MetaMask:', error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    };
    return (React.createElement("div", { className: "nft-flex nft-flex-col nft-items-center nft-justify-center nft-min-h-400 nft-p-8 nft-space-y-6" },
        React.createElement("div", { className: "nft-w-24 nft-h-24 nft-bg-white/10 nft-rounded-2xl nft-p-4 nft-backdrop-blur-sm" },
            React.createElement("img", { src: "https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg", alt: "MetaMask Logo", className: "nft-w-full nft-h-full nft-object-contain" })),
        React.createElement("h1", { className: "nft-text-3xl nft-font-bold nft-gradient-text" }, "NFT Media Importer"),
        React.createElement("p", { className: "nft-text-gray-300 nft-text-center nft-max-w-md nft-opacity-80" }, "Import your NFT media directly into Framer. Connect your wallet to get started."),
        React.createElement("button", { onClick: connectWallet, className: "nft-btn-primary nft-flex nft-items-center nft-space-x-2 nft-shadow-lg hover:nft-shadow-xl nft-transition-all" },
            React.createElement("svg", { className: "nft-w-5 nft-h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" })),
            React.createElement("span", null, "Connect MetaMask")),
        React.createElement("div", { className: "nft-text-gray-400 nft-text-sm nft-mt-4" }, "Powered by Web3 Technology")));
};
