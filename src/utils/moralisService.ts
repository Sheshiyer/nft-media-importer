import Moralis, { MoralisNFT } from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { config } from '../config';

class MoralisService {
  private static instance: MoralisService;
  private initialized = false;

  private constructor() {}

  public static getInstance(): MoralisService {
    if (!MoralisService.instance) {
      MoralisService.instance = new MoralisService();
    }
    return MoralisService.instance;
  }

  public async init() {
    if (!this.initialized) {
      if (!config.MORALIS_API_KEY) {
        throw new Error('MORALIS_API_KEY is not set in config');
      }
      
      await Moralis.start({
        apiKey: config.MORALIS_API_KEY,
      });
      
      this.initialized = true;
    }
  }

  public async getNFTs(address: string, chain = EvmChain.ETHEREUM): Promise<NFTMetadata[]> {
    await this.init();

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
      mediaItems: true,
      normalizeMetadata: true
    });

    return response.result.map(nft => ({
      tokenId: nft.tokenId,
      name: nft.name || `NFT #${nft.tokenId}`,
      description: nft.metadata?.description || '',
      image: this.getValidImageUrl(nft),
      contract: {
        address: nft.tokenAddress.lowercase,
        name: nft.contractType
      }
    }));
  }

  private getValidImageUrl(nft: MoralisNFT): string {
    // Check various possible image sources in order of preference
    const possibleSources = [
      nft.metadata?.image,
      nft.metadata?.image_url,
      nft.metadata?.animation_url,
      nft.media?.original_media_url,
      nft.media?.preview_image_url,
      config.DEFAULT_PLACEHOLDER
    ];

    // Return the first valid URL found
    return possibleSources.find(url => url && typeof url === 'string') || 
           config.DEFAULT_PLACEHOLDER;
  }

  public async isValidNFTOwner(
    address: string,
    contractAddress: string,
    tokenId: string,
    chain = EvmChain.ETHEREUM
  ): Promise<boolean> {
    await this.init();

    try {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
        tokenAddresses: [contractAddress],
        tokenId
      });

      return response.result.length > 0;
    } catch (error) {
      console.error('Error verifying NFT ownership:', error);
      return false;
    }
  }
}

export const moralisService = MoralisService.getInstance();
