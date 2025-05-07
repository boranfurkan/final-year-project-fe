'use client';

import { motion } from 'framer-motion';
import { Coins, Download, Share2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { UserResponseChain } from '@/api';
import { ImageDetails } from '@/api';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import useCreateMintEth from '@/hooks/ethereum/useCreateMint';
import { useCreateMint as useCreateMintSol } from '@/hooks/solana/useCreateMint';
import { getIPFSUrl, seperateIPFSId } from '@/lib/utils';

interface ProfileImageCardProps {
  image: ImageDetails;
  index: number;
}

const ProfileImageCard: React.FC<ProfileImageCardProps> = ({
  image,
  index,
}) => {
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const { user } = useAuth();
  const { createMint: createSolanaNFT, uploadSolanaMetadata } =
    useCreateMintSol();
  const { createMint: createEthereumNFT, uploadEthereumMetadata } =
    useCreateMintEth();

  // Handle image URL for IPFS
  const displayUrl = image.url.startsWith('ipfs://')
    ? `https://gateway.pinata.cloud/ipfs/${image.url.replace('ipfs://', '')}`
    : image.url;

  const formattedDate = new Date(image.createdAt).toLocaleDateString();

  const handleDownload = async () => {
    try {
      const response = await fetch(displayUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mintmuse-artwork-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Image downloaded successfully');
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Failed to download image');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'My MintMuse Creation',
          text: `Check out this artwork I created with MintMuse using prompt: "${image.prompt}"`,
          url: displayUrl,
        })
        .then(() => toast.success('Shared successfully'))
        .catch((error) => {
          console.error('Error sharing:', error);
          toast.error('Failed to share');
        });
    } else {
      navigator.clipboard
        .writeText(displayUrl)
        .then(() => toast.success('Image URL copied to clipboard'))
        .catch(() => toast.error('Failed to copy image URL'));
    }
  };

  const handleMint = async () => {
    if (!user) {
      toast.error('Please connect your wallet to mint this creation');
      return;
    }

    setIsMinting(true);

    try {
      const metadataResponse = await fetch('/api/generate-nft-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: image.prompt,
          generatedPrompt: image.prompt,
          imageUrl: displayUrl,
        }),
      });

      if (!metadataResponse.ok) {
        throw new Error('Failed to generate NFT metadata');
      }

      const { name, description } = await metadataResponse.json();
      const chain = user.chain;
      let metadataUrl: string;
      let mintResult: string;

      switch (chain) {
        case UserResponseChain.SOL:
          metadataUrl = await uploadSolanaMetadata(
            displayUrl,
            name,
            description
          );
          mintResult = await createSolanaNFT(
            getIPFSUrl(seperateIPFSId(metadataUrl)),
            name
          );
          toast.success(mintResult);
          setIsMinted(true);
          break;
        case UserResponseChain.SUI:
          toast.success('Minting on Sui is not yet implemented');
          break;
        case UserResponseChain.ETH:
          metadataUrl = await uploadEthereumMetadata(
            displayUrl,
            name,
            description
          );
          mintResult = await createEthereumNFT(
            getIPFSUrl(seperateIPFSId(metadataUrl)),
            name
          );
          toast.success(mintResult);
          setIsMinted(true);
          break;
        default:
          toast.error('Unsupported blockchain for minting');
          return;
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error('Failed to mint NFT');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl h-full flex flex-col"
    >
      {/* Image */}
      <div className="aspect-square relative">
        <Image
          src={displayUrl}
          alt={`Artwork created with prompt: ${image.prompt}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-white/80 text-sm italic line-clamp-2 mb-2">
          &quot;{image.prompt}&quot;
        </p>
        <p className="text-xs text-white/60 mb-4">Created on {formattedDate}</p>

        {/* Actions */}
        <div className="mt-auto flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex-1 bg-black/30 border-white/20 text-white hover:bg-white/10 hover:text-[#F3CC3E]"
          >
            <Download size={16} className="mr-2" />
            <span>Download</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex-1 bg-black/30 border-white/20 text-white hover:bg-white/10 hover:text-[#F3CC3E]"
          >
            <Share2 size={16} className="mr-2" />
            <span>Share</span>
          </Button>

          <Button
            size="sm"
            onClick={handleMint}
            disabled={isMinting || isMinted}
            className={`flex-1 ${
              isMinted
                ? 'bg-green-800/50 text-green-300 cursor-not-allowed'
                : isMinting
                ? 'bg-gray-800/50 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#2C75FF] to-[#F3CC3E] hover:opacity-90 text-white'
            }`}
          >
            <Coins size={16} className="mr-2" />
            <span>
              {isMinted ? 'Minted' : isMinting ? 'Minting...' : 'Mint'}
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileImageCard;
