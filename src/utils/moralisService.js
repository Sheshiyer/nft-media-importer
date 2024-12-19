import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { config } from '../config';
class MoralisService {
    constructor() {
        this.initialized = false;
    }
    static getInstance() {
        if (!MoralisService.instance) {
            MoralisService.instance = new MoralisService();
        }
        return MoralisService.instance;
    }
    async init() {
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
    async getNFTs(address, chain = EvmChain.ETHEREUM) {
        await this.init();
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
            mediaItems: true,
            normalizeMetadata: true
        });
        return response.result.map(nft => {
            var _a;
            return ({
                tokenId: nft.tokenId,
                name: nft.name || `NFT #${nft.tokenId}`,
                description: ((_a = nft.metadata) === null || _a === void 0 ? void 0 : _a.description) || '',
                image: this.getValidImageUrl(nft),
                contract: {
                    address: nft.tokenAddress.lowercase,
                    name: nft.contractType
                }
            });
        });
    }
    getValidImageUrl(nft) {
        var _a, _b, _c, _d, _e;
        // Check various possible image sources in order of preference
        const possibleSources = [
            (_a = nft.metadata) === null || _a === void 0 ? void 0 : _a.image,
            (_b = nft.metadata) === null || _b === void 0 ? void 0 : _b.image_url,
            (_c = nft.metadata) === null || _c === void 0 ? void 0 : _c.animation_url,
            (_d = nft.media) === null || _d === void 0 ? void 0 : _d.original_media_url,
            (_e = nft.media) === null || _e === void 0 ? void 0 : _e.preview_image_url,
            config.DEFAULT_PLACEHOLDER
        ];
        // Return the first valid URL found
        return possibleSources.find(url => url && typeof url === 'string') ||
            config.DEFAULT_PLACEHOLDER;
    }
    async isValidNFTOwner(address, contractAddress, tokenId, chain = EvmChain.ETHEREUM) {
        await this.init();
        try {
            const response = await Moralis.EvmApi.nft.getWalletNFTs({
                address,
                chain,
                tokenAddresses: [contractAddress],
                tokenId
            });
            return response.result.length > 0;
        }
        catch (error) {
            console.error('Error verifying NFT ownership:', error);
            return false;
        }
    }
}
export const moralisService = MoralisService.getInstance();
