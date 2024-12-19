interface Window {
  ethereum: any;
  $framer: {
    addMedia: (options: {
      name: string;
      url: string;
      type: 'image' | 'video' | 'audio';
    }) => Promise<void>;
  };
}

interface NFTMetadata {
  tokenId: string;
  name?: string;
  description?: string;
  image: string;
  contract: {
    address: string;
    name?: string;
  };
}

interface NFTGridProps {
  nfts: NFTMetadata[];
  onSelect: (nft: NFTMetadata) => void;
}

// Moralis types
declare module '@moralisweb3/common-evm-utils' {
  export class EvmChain {
    static readonly ETHEREUM: EvmChain;
    static readonly POLYGON: EvmChain;
    static readonly BSC: EvmChain;
  }
}

declare module 'moralis' {
  export interface MoralisNFT {
    tokenId: string;
    tokenAddress: {
      lowercase: string;
    };
    name?: string;
    metadata?: {
      description?: string;
      image?: string;
      image_url?: string;
      animation_url?: string;
    };
    contractType?: string;
    media?: {
      original_media_url?: string;
      preview_image_url?: string;
    };
  }

  export interface EvmApi {
    nft: {
      getWalletNFTs(params: {
        address: string;
        chain: any;
        mediaItems?: boolean;
        normalizeMetadata?: boolean;
        tokenAddresses?: string[];
        tokenId?: string;
      }): Promise<{
        result: MoralisNFT[];
      }>;
    };
  }

  export const EvmApi: EvmApi;

  export function start(config: { apiKey: string }): Promise<void>;
}
