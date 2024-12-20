import { useState, useCallback } from 'react';
import type { NFTMetadata } from '../types';
import { MoralisService } from '../utils/moralisService';

const moralisService = new MoralisService();

export const useNFTFetcher = () => {
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = useCallback(async (address: string) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedNFTs = await moralisService.getNFTs(address);
      setNfts(fetchedNFTs);
    } catch (err) {
      console.error('Error fetching NFTs:', err);
      setError('Failed to fetch NFTs. Please try again.');
      setNfts([]);
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
      return await moralisService.verifyNFTOwnership(address, contractAddress, tokenId);
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
    verifyNFTOwnership,
  };
};
