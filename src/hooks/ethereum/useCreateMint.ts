import { ethers } from 'ethers';
import { useState, useCallback } from 'react';

import {
  CreateNftMetadataDtoChain,
  nftControllerCreateNftMetadata,
} from '@/api';

import ABI from '../../configs/eth/abi.json';

export const ETH_CONTRACT_ADDRESS =
  '0xde9c3977d23d62dfdfe8e2f985ce1fc778ca2805';
export const SEPOLIA_CHAIN_ID = '0xaa36a7';

export const getMetaMaskProvider = (): any => {
  if (window.ethereum?.providers) {
    return window.ethereum.providers.find((p: any) => p.isMetaMask);
  }
  if (window.ethereum?.isMetaMask) {
    return window.ethereum;
  }

  console.error('MetaMask is not available');
  return null;
};

interface UseCreateMintReturn {
  createMint: (metadataUrl: string, nftName: string) => Promise<string>;
  getOwner: (tokenId: string) => Promise<string>;
  getTokenMetadata: (tokenId: string) => Promise<any>;
  uploadEthereumMetadata: (
    imageURL: string,
    name: string,
    description: string
  ) => Promise<string>;
  status: string;
  isLoading: boolean;
  error: string | null;
}

const useCreateMint = (): UseCreateMintReturn => {
  const [status, setStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createMint = useCallback(
    async (metadataUrl: string): Promise<string> => {
      setIsLoading(true);
      setError(null);
      setStatus('Initiating mint...');

      const providerInstance = getMetaMaskProvider();

      if (!providerInstance) {
        const errMsg =
          'MetaMask is not available. Please install or enable MetaMask.';
        setError(errMsg);
        setIsLoading(false);
        throw new Error(errMsg);
      }

      try {
        await providerInstance.request({ method: 'eth_requestAccounts' });

        await providerInstance.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        });

        const provider = new ethers.BrowserProvider(providerInstance);

        const signer = await provider.getSigner();

        const userAddress: string = await signer.getAddress();

        const contract = new ethers.Contract(ETH_CONTRACT_ADDRESS, ABI, signer);

        setStatus('Minting NFT...');

        const tokenId = Math.floor(Math.random() * 1_000_000);
        const tx = await contract.safeMint(userAddress, tokenId, metadataUrl);
        const receipt = await tx.wait();

        setStatus(`NFT minted successfully! Tx: ${receipt.transactionHash}`);
        setIsLoading(false);
        return receipt.hash.toString();
      } catch (err: any) {
        setError(err.message);
        setStatus(`Error: ${err.message}`);
        setIsLoading(false);
        throw new Error(err.message);
      }
    },
    []
  );

  const getOwner = async (tokenId: string): Promise<string> => {
    const providerInstance = getMetaMaskProvider();

    if (!providerInstance) {
      throw new Error('MetaMask is not available');
    }

    const provider = new ethers.BrowserProvider(providerInstance);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(ETH_CONTRACT_ADDRESS, ABI, signer);

    const owner = await contract.ownerOf(tokenId);
    return owner;
  };

  const getTokenMetadata = async (tokenId: string): Promise<any> => {
    const providerInstance = getMetaMaskProvider();
    if (!providerInstance) {
      throw new Error('MetaMask is not available');
    }
    const provider = new ethers.BrowserProvider(providerInstance);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(ETH_CONTRACT_ADDRESS, ABI, signer);
    const tokenUri = await contract.tokenURI(tokenId);
    const metadataUrl = tokenUri;
    const response = await fetch(metadataUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }
    const metadata = await response.json();
    return metadata;
  };

  const uploadEthereumMetadata = async (
    imageURL: string,
    name: string,
    description: string
  ) => {
    const upload = await nftControllerCreateNftMetadata({
      chain: CreateNftMetadataDtoChain.ETH,
      imageUrl: imageURL,
      name: name,
      description: description,
      externalUrl: 'https://www.mint-muse.com',
      attributes: [],
    });

    return upload.metadataUrl;
  };

  return {
    createMint,
    getOwner,
    getTokenMetadata,
    uploadEthereumMetadata,
    status,
    isLoading,
    error,
  };
};

export default useCreateMint;
