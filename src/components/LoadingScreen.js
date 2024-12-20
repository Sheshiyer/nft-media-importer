import React from 'react';
import { Oval } from 'react-loading-icons';
export const LoadingScreen = ({ message = 'Fetching your NFTs...' }) => {
    return (React.createElement("div", { className: "nft-flex nft-flex-col nft-items-center nft-justify-center nft-min-h-400 nft-p-8 nft-space-y-4" },
        React.createElement("div", { className: "nft-w-24 nft-h-24 nft-relative" },
            React.createElement(Oval, { stroke: "url(#gradient-nft)", strokeWidth: 3, speed: 1.5, className: "nft-w-full nft-h-full" }),
            React.createElement("div", { className: "nft-absolute nft-inset-0 nft-flex nft-items-center nft-justify-center" },
                React.createElement("div", { className: "nft-w-12 nft-h-12 nft-bg-gradient-nft nft-rounded-full nft-animate-pulse-slow nft-opacity-30" }))),
        React.createElement("p", { className: "nft-gradient-text nft-text-lg nft-text-center nft-font-medium nft-animate-pulse" }, message),
        React.createElement("div", { className: "nft-text-sm nft-text-gray-400 nft-mt-4 nft-text-center nft-max-w-md" }, "This may take a moment while we fetch your NFTs from multiple chains..."),
        React.createElement("div", { className: "nft-flex nft-space-x-4 nft-mt-6 nft-bg-white/5 nft-rounded-full nft-px-6 nft-py-2 nft-backdrop-blur-sm" },
            React.createElement("div", { className: "nft-flex nft-items-center nft-space-x-2" },
                React.createElement("div", { className: "nft-w-2 nft-h-2 nft-bg-nft-indigo nft-rounded-full nft-animate-pulse" }),
                React.createElement("span", { className: "nft-text-xs nft-text-gray-300" }, "Ethereum")),
            React.createElement("div", { className: "nft-flex nft-items-center nft-space-x-2" },
                React.createElement("div", { className: "nft-w-2 nft-h-2 nft-bg-nft-purple nft-rounded-full nft-animate-pulse" }),
                React.createElement("span", { className: "nft-text-xs nft-text-gray-300" }, "Polygon")),
            React.createElement("div", { className: "nft-flex nft-items-center nft-space-x-2" },
                React.createElement("div", { className: "nft-w-2 nft-h-2 nft-bg-nft-pink nft-rounded-full nft-animate-pulse" }),
                React.createElement("span", { className: "nft-text-xs nft-text-gray-300" }, "Optimism"))),
        React.createElement("svg", { width: "0", height: "0", className: "nft-hidden" },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: "gradient-nft", x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
                    React.createElement("stop", { offset: "0%", stopColor: "#6366f1" }),
                    React.createElement("stop", { offset: "50%", stopColor: "#8b5cf6" }),
                    React.createElement("stop", { offset: "100%", stopColor: "#d946ef" }))))));
};
