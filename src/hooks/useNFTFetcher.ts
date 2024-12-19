import { useState, useCallback } from 'react';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { moralisService } from '../utils/moralisService';

export const useNFTFetcher = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);

  const fetchNFTs = useCallback(async (address: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get NFTs from both Ethereum and Polygon networks
      const [ethereumNFTs, polygonNFTs] = await Promise.all([
        moralisService.getNFTs(address, EvmChain.ETHEREUM),
        moralisService.getNFTs(address, EvmChain.POLYGON)
      ]);

      // Combine and filter out NFTs without valid media
      const allNFTs = [...ethereumNFTs, ...polygonNFTs]
        .filter(nft => nft.image && nft.image !== 'https://via.placeholder.com/400x400?text=No+Image');

      setNfts(allNFTs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch NFTs';
      setError(errorMessage);
      console.error('Error fetching NFTs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyNFTOwnership = useCallback(async (
    address: string,
    contractAddress: string,
    tokenId: string
  ) => {
    try {
      return await moralisService.isValidNFTOwner(
        address,
        contractAddress,
        tokenId
      );
    } catch (err) {
      console.error('Error verifying NFT ownership:', err);
      return false;
    }
  }, []);

  return {
    nfts,
    loading,
    error,
    fetchNFTs,
    verifyNFTOwnership
  };
};
