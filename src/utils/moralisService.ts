import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import type { NFTMetadata } from '../types';

export class MoralisService {
  constructor() {
    // Initialize Moralis
    if (!Moralis.Core.isStarted) {
      Moralis.start({
        apiKey: process.env.MORALIS_API_KEY || '',
      });
    }
  }

  private async parseNFTMetadata(nft: any): Promise<NFTMetadata> {
    let metadata = nft.metadata;
    if (typeof metadata === 'string') {
      try {
        metadata = JSON.parse(metadata);
      } catch {
        metadata = {};
      }
    }

    return {
      tokenId: nft.tokenId,
      name: metadata?.name || nft.name || `NFT #${nft.tokenId}`,
      description: metadata?.description || '',
      image: metadata?.image || nft.tokenUri || '',
      contract: {
        address: nft.tokenAddress,
      },
      metadata: metadata,
    };
  }

  public async getNFTs(address: string, chain = EvmChain.ETHEREUM): Promise<NFTMetadata[]> {
    try {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      });

      const nfts = await Promise.all(
        response.result.map(nft => this.parseNFTMetadata(nft))
      );

      return nfts;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      throw error;
    }
  }

  public async verifyNFTOwnership(
    address: string,
    contractAddress: string,
    tokenId: string,
    chain = EvmChain.ETHEREUM
  ): Promise<boolean> {
    try {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
        tokenAddresses: [contractAddress],
      });

      return response.result.some(nft => 
        nft.tokenAddress.lowercase === contractAddress.toLowerCase() &&
        nft.tokenId === tokenId
      );
    } catch (error) {
      console.error('Error verifying NFT ownership:', error);
      return false;
    }
  }
}
