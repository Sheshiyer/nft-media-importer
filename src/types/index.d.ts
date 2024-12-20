interface NFTMetadata {
  tokenId: string;
  name?: string;
  description?: string;
  image?: string;
  contract?: {
    address: string;
  };
  metadata?: {
    description?: string;
    image?: string;
    name?: string;
  };
}

interface FramerCollectionConfig {
  mode?: 'grid' | 'list';
  itemSize?: {
    width: number;
    height: number;
  };
  gap?: number;
  padding?: number;
}

interface FramerAddMediaOptions {
  name: string;
  url: string;
  type: string;
}

interface FramerAPI {
  addMedia: (options: FramerAddMediaOptions) => Promise<void>;
}

interface MetaMaskEthereum {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (accounts: string[]) => void) => void;
  removeListener: (event: string, callback: (accounts: string[]) => void) => void;
  isMetaMask?: boolean;
}

declare global {
  interface Window {
    $framer?: FramerAPI;
    ethereum?: MetaMaskEthereum;
  }
}

export type { NFTMetadata, FramerCollectionConfig, FramerAddMediaOptions, FramerAPI, MetaMaskEthereum };
