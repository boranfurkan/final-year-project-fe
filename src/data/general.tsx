import { MessageSquare, ImageIcon, Wallet, CheckCircle2 } from 'lucide-react';

export const SITE_NAME = 'MintMuse';
export const SITE_DESCRIPTION =
  'Transform imagination into unique NFTs with AI-powered Van Gogh style art generation';

// Van Gogh inspired color palette
export const COLORS = {
  primary: {
    blue: '#2C75FF', // Starry Night blue
    yellow: '#F3CC3E', // Sunflower yellow
    green: '#3D6F43', // Olive green
    brown: '#854F2B', // Earthy brown
    teal: '#4FACAA', // Teal accent
  },
  gradient: {
    blueYellow: 'from-[#2C75FF] to-[#F3CC3E]',
    blueGreen: 'from-[#2C75FF] to-[#3D6F43]',
    yellowBrown: 'from-[#F3CC3E] to-[#854F2B]',
  },
  background: {
    dark: '#0D1117',
    darker: '#070A0F',
  },
};

// Mock prompts for HeroSection
export const SAMPLE_PROMPTS = [
  'A serene countryside landscape with rolling wheat fields under a vibrant sunset sky with swirling clouds',
  'A quiet café terrace at night illuminated by warm yellow lights, with a starry sky above',
  'Twisted cypress trees against a turbulent sky with crescent moon and swirling stars',
  'A vase filled with vibrant sunflowers positioned by a window with morning light streaming in',
  'A peaceful riverside village with boats docked along the shore and hills in the distance',
  'A lively outdoor market in a small French town with colorful stalls and bustling crowds',
  'A wooden chair by a window overlooking a garden with blooming irises and roses',
  'A winding path through an olive grove with mountains visible on the horizon',
];

// Featured creations for ShowcaseSection
export const FEATURED_CREATIONS = [
  {
    id: 1,
    title: 'Starry Landscape',
    prompt:
      'A breathtaking night landscape with swirling stars in the sky above a small village with glowing windows',
    chain: 'ethereum',
    creator: '0x742...8def',
    image: '/showcase/nft1.jpg',
  },
  {
    id: 2,
    title: 'Sunlit Orchard',
    prompt:
      'An orchard of blossoming trees under bright sunlight with long shadows cast across the ground',
    chain: 'solana',
    creator: 'SNK9...j2PV',
    image: '/showcase/nft2.jpg',
  },
  {
    id: 3,
    title: 'Cypress Path',
    prompt:
      'A winding path through tall cypress trees with fields of lavender and wheat in the distance',
    chain: 'sui',
    creator: '0x881...5ce1',
    image: '/showcase/nft3.jpg',
  },
  {
    id: 4,
    title: 'Café Evening',
    prompt:
      'A cozy outdoor café at dusk with hanging lights illuminating patrons enjoying their evening',
    chain: 'ethereum',
    creator: '0x938...4f21',
    image: '/showcase/nft4.jpg',
  },
  {
    id: 5,
    title: 'Flower Fields',
    prompt:
      'Vibrant fields of wildflowers stretching toward the horizon under a bright blue sky with puffy clouds',
    chain: 'solana',
    creator: 'AK72...9fZ1',
    image: '/showcase/nft5.jpg',
  },
  {
    id: 6,
    title: 'Village Bridge',
    prompt:
      'An old stone bridge crossing a gentle river with a small village visible in the background',
    chain: 'sui',
    creator: '0x422...9a7b',
    image: '/showcase/nft6.jpg',
  },
];

export const CHAIN_ICONS = {
  ethereum: '/icons/ethereum.svg',
  solana: '/icons/solana.svg',
  sui: '/icons/sui.svg',
};

export const FEATURES = [
  {
    icon: 'Cpu',
    title: 'Van Gogh Style AI',
    description:
      "Our AI models are fine-tuned on Vincent van Gogh's masterpieces to create stunning artwork with his distinctive style from your prompts.",
    color: 'from-[#2C75FF] to-[#4FACAA]',
  },
  {
    icon: 'Sparkles',
    title: 'Post-Impressionist Perfection',
    description:
      "Experience bold brushstrokes, vibrant colors, and emotional expressiveness characteristic of Van Gogh's revolutionary artistic vision.",
    color: 'from-[#F3CC3E] to-[#854F2B]',
  },
  {
    icon: 'Coins',
    title: 'Multi-Chain Support',
    description:
      'Mint your creation on Ethereum, Solana, or Sui blockchain with just a few clicks for maximum flexibility and reach.',
    color: 'from-[#3D6F43] to-[#4FACAA]',
  },
  {
    icon: 'Zap',
    title: 'Instant Generation',
    description:
      'Get your Van Gogh-inspired NFT artwork in seconds, no waiting or complicated setup required.',
    color: 'from-[#F3CC3E] to-[#C26330]',
  },
  {
    icon: 'Link',
    title: 'Decentralized Storage',
    description:
      'Your NFT metadata and artwork are securely stored on IPFS, ensuring they remain accessible and tamper-proof forever.',
    color: 'from-[#2C75FF] to-[#854F2B]',
  },
  {
    icon: 'Shield',
    title: 'Full Ownership',
    description:
      'You retain 100% ownership of all generated assets with verifiable on-chain provenance and built-in authenticity.',
    color: 'from-[#4FACAA] to-[#3D6F43]',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: 'Create Your Prompt',
    description:
      'Describe your vision in detail. The more specific your prompt, the better the Van Gogh-style result.',
    icon: <MessageSquare className="w-full h-full" />,
    color: '#F3CC3E',
    accentColor: '#fcd34d',
  },
  {
    id: 2,
    title: 'AI Generates Artwork',
    description:
      'Our fine-tuned AI system transforms your prompt into unique Van Gogh-style artwork in seconds with neural style transfer.',
    icon: <ImageIcon className="w-full h-full" />,
    color: '#3b82f6',
    accentColor: '#93c5fd',
  },
  {
    id: 3,
    title: 'Choose Blockchain & Mint',
    description:
      'Select Ethereum, Solana, or Sui blockchain and mint your artwork as an NFT with one click.',
    icon: <Wallet className="w-full h-full" />,
    color: '#65a30d',
    accentColor: '#86efac',
  },
  {
    id: 4,
    title: 'Own Your Creation',
    description:
      'Your NFT is now on the blockchain with IPFS-stored metadata, ready to be showcased or sold in marketplaces.',
    icon: <CheckCircle2 className="w-full h-full" />,
    color: '#b45309',
    accentColor: '#fbbf24',
  },
];
