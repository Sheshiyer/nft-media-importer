# NFT Media Importer for Framer

A Framer plugin that allows you to import NFT media directly from Web3 wallets into your Framer projects.

## Features

- Connect MetaMask wallet with one click
- Fetch NFTs from Ethereum and Polygon networks
- Beautiful masonry grid layout for NFT display
- Preview and select NFTs before importing
- Direct import to Framer's media library
- Ownership verification before import
- Support for various NFT media types
- Responsive and user-friendly interface

## Installation

1. Open Framer
2. Go to Menu > Plugins > Install Plugin
3. Search for "NFT Media Importer"
4. Click Install

## Usage

1. Open the plugin from the Framer plugins menu
2. Click "Connect MetaMask" to connect your Web3 wallet
3. Wait for your NFTs to load from supported networks
4. Browse through your NFT collection in the masonry grid
5. Click on an NFT to select it
6. Review and confirm the import in the confirmation dialog
7. The NFT media will be added to your Framer project's media library

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/sheshiyer/nft-media-importer.git
cd nft-media-importer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Moralis API key:
```
VITE_MORALIS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Testing

### Prerequisites
- Node.js 16+ installed
- MetaMask browser extension
- Test wallet with NFTs (can use testnet NFTs)
- Moralis API key

### Local Testing

1. Run the development server:
```bash
npm run dev
```

2. Test the plugin in development mode:
- Open Framer
- Go to Plugins > Development > Import Local Plugin
- Select the `manifest.json` from your project directory

3. Test the following functionality:
- MetaMask connection
- NFT fetching from different networks
- Grid display and responsiveness
- Media preview
- Import functionality
- Error handling

### Unit Testing
```bash
npm run test
```

### End-to-End Testing
```bash
npm run test:e2e
```

### Manual Testing Checklist

#### Wallet Connection
- [ ] MetaMask connection successful
- [ ] Handles connection errors gracefully
- [ ] Shows correct wallet address
- [ ] Disconnect functionality works

#### NFT Fetching
- [ ] Loads NFTs from Ethereum network
- [ ] Loads NFTs from Polygon network
- [ ] Shows loading state
- [ ] Handles empty collections
- [ ] Handles API errors

#### UI/UX
- [ ] Grid layout renders correctly
- [ ] Images load properly
- [ ] Selection feedback is clear
- [ ] Confirmation dialog works
- [ ] Loading states are visible
- [ ] Error messages are clear

#### Import Function
- [ ] Successfully imports to Framer
- [ ] Handles different media types
- [ ] Shows import progress
- [ ] Confirms successful import
- [ ] Handles import errors

## Supported Networks

- Ethereum Mainnet
- Polygon Network

## Requirements

- MetaMask browser extension
- Active Web3 wallet with NFTs
- Internet connection

## Technical Details

Built with:
- React
- TypeScript
- Moralis Web3 API
- TailwindCSS
- Ethers.js

## Support

For issues, feature requests, or questions, please visit the [GitHub repository](https://github.com/sheshiyer/nft-media-importer/issues) or contact support@yourwebsite.com.

## License

MIT License - feel free to use this plugin in your projects!
