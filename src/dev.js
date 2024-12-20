import './polyfills';
import React from 'react';
import { createRoot } from 'react-dom/client';
import plugin from './index';
const NFTMediaImporter = plugin.component;
// Mock Framer's addMedia function for development
if (!window.$framer) {
    window.$framer = {
        addMedia: async ({ name, url, type }) => {
            console.log('Mock addMedia called with:', { name, url, type });
        }
    };
}
const container = document.getElementById('root') || document.createElement('div');
if (!container.id) {
    container.id = 'root';
    document.body.appendChild(container);
}
const root = createRoot(container);
root.render(React.createElement(React.StrictMode, null,
    React.createElement("div", { className: "nft-p-4" },
        React.createElement(NFTMediaImporter, null))));
