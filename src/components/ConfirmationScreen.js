import React from 'react';
import { Dialog } from '@headlessui/react';
export const ConfirmationScreen = ({ nft, isOpen, onConfirm, onCancel, }) => {
    if (!nft)
        return null;
    return (React.createElement(Dialog, { open: isOpen, onClose: onCancel, className: "nft-fixed nft-inset-0 nft-z-10 nft-overflow-y-auto" },
        React.createElement("div", { className: "nft-min-h-screen nft-px-4 nft-text-center" },
            React.createElement("div", { className: "nft-fixed nft-inset-0 nft-bg-black/50 nft-backdrop-blur-sm", "aria-hidden": "true" }),
            React.createElement("span", { className: "nft-inline-block nft-h-screen nft-align-middle", "aria-hidden": "true" }, "\u200B"),
            React.createElement(Dialog.Panel, { className: "nft-inline-block nft-w-full nft-max-w-md nft-p-6 nft-my-8 nft-overflow-hidden nft-text-left nft-align-middle nft-transition-all nft-transform nft-bg-gray-900/95 nft-backdrop-blur-xl nft-shadow-xl nft-rounded-2xl nft-border nft-border-white/10" },
                React.createElement(Dialog.Title, { as: "h3", className: "nft-text-xl nft-font-bold nft-leading-6 nft-gradient-text" }, "Import NFT to Framer"),
                React.createElement("div", { className: "nft-mt-4" },
                    React.createElement("div", { className: "nft-aspect-square nft-w-full nft-rounded-xl nft-overflow-hidden nft-mb-4 nft-bg-black/20 nft-ring-1 nft-ring-white/10" },
                        React.createElement("img", { src: nft.image, alt: nft.name || `NFT #${nft.tokenId}`, className: "nft-w-full nft-h-full nft-object-cover", onError: (e) => {
                                e.target.src = 'https://via.placeholder.com/400x400?text=Failed+to+load+NFT';
                            } })),
                    React.createElement("div", { className: "nft-mb-4" },
                        React.createElement("h4", { className: "nft-font-medium nft-text-white nft-flex nft-items-center nft-space-x-2" },
                            React.createElement("span", { className: "nft-w-2 nft-h-2 nft-rounded-full nft-bg-gradient-nft" }),
                            React.createElement("span", null, nft.name || `NFT #${nft.tokenId}`)),
                        nft.description && (React.createElement("p", { className: "nft-text-sm nft-text-gray-300 nft-mt-2 nft-line-clamp-3 nft-bg-white/5 nft-rounded-lg nft-p-3" }, nft.description)),
                        React.createElement("div", { className: "nft-mt-3 nft-flex nft-items-center nft-text-xs nft-text-gray-400 nft-bg-white/5 nft-rounded-full nft-px-3 nft-py-1 nft-w-fit" },
                            React.createElement("svg", { className: "nft-w-4 nft-h-4 nft-mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })),
                            React.createElement("span", null,
                                "Token ID: ",
                                nft.tokenId))),
                    React.createElement(Dialog.Description, { className: "nft-text-sm nft-text-gray-400 nft-mb-6 nft-bg-white/5 nft-rounded-xl nft-p-4 nft-border nft-border-white/10" },
                        React.createElement("div", { className: "nft-flex nft-items-start nft-space-x-3" },
                            React.createElement("svg", { className: "nft-w-5 nft-h-5 nft-mt-0.5 nft-gradient-text", fill: "none", stroke: "url(#gradient-nft)", viewBox: "0 0 24 24" },
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })),
                            React.createElement("span", null, "This NFT will be imported to your Framer project's media library. You can use it in your designs just like any other media asset."))),
                    React.createElement("div", { className: "nft-mt-6 nft-flex nft-justify-end nft-space-x-3" },
                        React.createElement("button", { type: "button", className: "nft-btn-secondary nft-text-gray-300", onClick: onCancel }, "Cancel"),
                        React.createElement("button", { type: "button", className: "nft-btn-primary nft-flex nft-items-center nft-space-x-2 nft-shadow-lg hover:nft-shadow-xl nft-transition-all", onClick: onConfirm },
                            React.createElement("svg", { className: "nft-w-4 nft-h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" })),
                            React.createElement("span", null, "Import to Framer")))))),
        React.createElement("svg", { width: "0", height: "0", className: "nft-hidden" },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: "gradient-nft", x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
                    React.createElement("stop", { offset: "0%", stopColor: "#6366f1" }),
                    React.createElement("stop", { offset: "50%", stopColor: "#8b5cf6" }),
                    React.createElement("stop", { offset: "100%", stopColor: "#d946ef" }))))));
};
