import { FEATURED_CREATIONS_TYPE } from '@/types/general';
import { MessageSquare, ImageIcon, Wallet, CheckCircle2 } from 'lucide-react';

export const SITE_NAME = 'MintMuse';
export const SITE_DESCRIPTION =
  'Transform imagination into unique NFTs with AI-powered Van Gogh style art generation';

// Prompts for HeroSection
export const SAMPLE_PROMPTS = [
  {
    prompt:
      'A serene countryside landscape with rolling wheat fields under a vibrant sunset sky with swirling clouds',
    image: '/images/ai-generated-images/serene-countryside.png',
  },
  {
    prompt:
      'A quiet café terrace at night illuminated by warm yellow lights, with a starry sky above',
    image: '/images/ai-generated-images/quiet-cafe-terrace.png',
  },
  {
    prompt:
      'Twisted cypress trees against a turbulent sky with crescent moon and swirling stars',
    image: '/images/ai-generated-images/twisted-cypress-trees.png',
  },
  {
    prompt:
      'A vase filled with vibrant sunflowers positioned by a window with morning light streaming in',
    image: '/images/ai-generated-images/vase-filled.png',
  },
  {
    prompt:
      'A peaceful riverside village with boats docked along the shore and hills in the distance',
    image: '/images/ai-generated-images/peaceful-riverside.png',
  },
  {
    prompt:
      'A lively outdoor market in a small French town with colorful stalls and bustling crowds',
    image: '/images/ai-generated-images/lively-outdoor-market.png',
  },
  {
    prompt:
      'A wooden chair by a window overlooking a garden with blooming irises and roses',
    image: '/images/ai-generated-images/wooden-chair.png',
  },
  {
    prompt:
      'A winding path through an olive grove with mountains visible on the horizon',
    image: '/images/ai-generated-images/olive-grove.png',
  },
];

// Featured creations for ShowcaseSection
export const FEATURED_CREATIONS: FEATURED_CREATIONS_TYPE = [
  {
    id: 1,
    title: 'Starry Landscape',
    prompt:
      'A breathtaking night landscape with swirling stars in the sky above a small village with glowing windows',
    chain: 'ethereum',
    chainTicker: 'ETH',
    creator: '0x742...8def',
    image: '/images/ai-generated-images/night-landscape.png',
  },
  {
    id: 2,
    title: 'Sunlit Orchard',
    prompt:
      'An orchard of blossoming trees under bright sunlight with long shadows cast across the ground',
    chain: 'solana',
    chainTicker: 'SOL',
    creator: 'SNK9...j2PV',
    image: '/images/ai-generated-images/blossoming-trees.png',
  },
  {
    id: 3,
    title: 'Cypress Path',
    prompt:
      'A winding path through tall cypress trees with fields of lavender and wheat in the distance',
    chain: 'sui',
    chainTicker: 'SUI',
    creator: '0x881...5ce1',
    image: '/images/ai-generated-images/cypress-trees.png',
  },
  {
    id: 4,
    title: 'Café Evening',
    prompt:
      'A cozy outdoor café at dusk with hanging lights illuminating patrons enjoying their evening',
    chain: 'ethereum',
    chainTicker: 'ETH',
    creator: '0x938...4f21',
    image: '/images/ai-generated-images/cozy-outdoor-cafe.png',
  },
  {
    id: 5,
    title: 'Flower Fields',
    prompt:
      'Vibrant fields of wildflowers stretching toward the horizon under a bright blue sky with puffy clouds',
    chain: 'solana',
    chainTicker: 'SOL',
    creator: 'AK72...9fZ1',
    image: '/images/ai-generated-images/fields-of-wildflowers.png',
  },
  {
    id: 6,
    title: 'Village Bridge',
    prompt:
      'An old stone bridge crossing a gentle river with a small village visible in the background',
    chain: 'sui',
    chainTicker: 'SUI',
    creator: '0x422...9a7b',
    image: '/images/ai-generated-images/old-stone-bridge.png',
  },
];

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
