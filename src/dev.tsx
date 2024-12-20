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
      return Promise.resolve();
    }
  };
}

// Mock require function
if (typeof window !== 'undefined' && !window.require) {
  (window as any).require = function mockRequire() {
    return {
      resolve: () => '',
      cache: {},
      extensions: {},
      main: null
    };
  };
}

const container = document.getElementById('root') || document.createElement('div');
if (!container.id) {
  container.id = 'root';
  document.body.appendChild(container);
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <div className="nft-p-4">
      <NFTMediaImporter />
    </div>
  </React.StrictMode>
);
