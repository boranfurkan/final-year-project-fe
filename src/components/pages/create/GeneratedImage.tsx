import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Download, Share2, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { UserResponseChain } from '@/api';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import useCreateMintEth from '@/hooks/ethereum/useCreateMint';
import { useCreateMint as useCreateMintSol } from '@/hooks/solana/useCreateMint';
import { ImageGenerationResult } from '@/hooks/useImageGeneration';
import { getIPFSUrl, seperateIPFSId } from '@/lib/utils';

interface GeneratedImageProps {
  image: ImageGenerationResult;
  onReset: () => void;
  isWalletConnected: boolean;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({
  image,
  onReset,
  isWalletConnected,
}) => {
  const { user } = useAuth();
  const { createMint: createSolanaNFT, uploadSolanaMetadata } =
    useCreateMintSol();

  const { createMint: createEthereumNFT, uploadEthereumMetadata } =
    useCreateMintEth();

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const stableKey = useRef(`image-result-${image.imageURL}`).current;

  const handleDownload = async () => {
    try {
      const response = await fetch(image.imageURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mintmuse-creation-${Date.now()}.png`;
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
          text: 'Check out this artwork I created with MintMuse!',
          url: image.imageURL,
        })
        .then(() => toast.success('Shared successfully'))
        .catch((error) => {
          console.error('Error sharing:', error);
          toast.error('Failed to share');
        });
    } else {
      navigator.clipboard
        .writeText(image.imageURL)
        .then(() => toast.success('Image URL copied to clipboard'))
        .catch(() => toast.error('Failed to copy image URL'));
    }
  };

  const handleMint = async () => {
    setIsMinting(true);

    if (!user) {
      toast.error('Please connect your wallet to mint this creation');
      setIsMinting(false);
      return;
    }

    const chain = user.chain;
    let metadataUrl: string;
    let mintResult: string;

    try {
      const metadataResponse = await fetch('/api/generate-nft-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: image.prompt,
          generatedPrompt: image.prompt,
          imageUrl: image.imageURL,
        }),
      });

      if (!metadataResponse.ok) {
        throw new Error('Failed to generate NFT metadata');
      }

      const { name, description } = await metadataResponse.json();

      switch (chain) {
        case UserResponseChain.SOL:
          metadataUrl = await uploadSolanaMetadata(
            image.imageURL,
            name,
            description
          );
          mintResult = await createSolanaNFT(
            getIPFSUrl(seperateIPFSId(metadataUrl)),
            name
          );
          toast.success(mintResult);
          setIsMinted(true);
          setIsMinting(false);
          break;
        case UserResponseChain.SUI:
          toast.success('Minting on Sui is not yet implemented');
          setIsMinting(false);
          break;
        case UserResponseChain.ETH:
          metadataUrl = await uploadEthereumMetadata(
            image.imageURL,
            name,
            description
          );
          mintResult = await createEthereumNFT(
            getIPFSUrl(seperateIPFSId(metadataUrl)),
            name
          );
          toast.success(mintResult);
          setIsMinted(true);
          setIsMinting(false);
          break;
        default:
          toast.error('Unsupported blockchain for minting');
          setIsMinting(false);
          return;
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error('Failed to mint NFT');
      setIsMinting(false);
      return;
    }
  };

  return (
    <motion.div
      key={stableKey}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-4 mb-8"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-square w-full">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'linear',
                }}
              >
                <RefreshCw size={40} className="text-[#F3CC3E]" />
              </motion.div>
            </div>
          )}
          <Image
            src={image.imageURL}
            alt="Generated artwork"
            fill
            className="object-cover"
            onLoadingComplete={() => setIsImageLoading(false)}
          />
        </div>

        {/* Image info and actions */}
        <div className="p-4 bg-black/70">
          <h3 className="text-lg font-bold text-[#F3CC3E] mb-1">
            Your Creation
          </h3>
          <p className="text-white/80 text-sm mb-4 italic line-clamp-2">
            &apos;{image.prompt}&apos;
          </p>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="bg-black/30 border-white/20 text-white hover:bg-white/10 hover:text-[#F3CC3E] flex-1"
            >
              <Download size={16} className="mr-2" />
              Download
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="bg-black/30 border-white/20 text-white hover:bg-white/10 hover:text-[#F3CC3E] flex-1"
            >
              <Share2 size={16} className="mr-2" />
              Share
            </Button>

            <Button
              size="sm"
              onClick={handleMint}
              disabled={isMinting || !isWalletConnected || isMinted}
              className={`flex-1 ${
                isWalletConnected && !isMinted
                  ? 'bg-gradient-to-r from-[#2C75FF] to-[#F3CC3E] hover:opacity-90 text-white'
                  : isMinted
                  ? 'bg-green-800/50 text-green-300 cursor-not-allowed'
                  : 'bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isMinting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: 'linear',
                  }}
                  className="mr-2"
                >
                  <RefreshCw size={16} />
                </motion.div>
              ) : (
                <Coins size={16} className="mr-2" />
              )}
              {isMinting ? 'Minting...' : isMinted ? 'Minted' : 'Mint as NFT'}
            </Button>
          </div>

          {!isWalletConnected && !isMinted && (
            <p className="text-yellow-500/70 text-xs mt-2 text-center">
              Connect your wallet to mint this creation as an NFT
            </p>
          )}

          {isMinted && (
            <p className="text-green-500/70 text-xs mt-2 text-center">
              Successfully minted as an NFT on the blockchain
            </p>
          )}

          <div className="mt-4 pt-3 border-t border-white/10 flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-white/60 hover:text-white hover:bg-black/30"
            >
              <RefreshCw size={14} className="mr-2" />
              Create something new
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GeneratedImage;
