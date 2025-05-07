import { mplCore } from '@metaplex-foundation/mpl-core';
import { Umi } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { useWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export const useUmi = (): Umi | null => {
  const wallet = useWallet();
  const [umi, setUmi] = useState<Umi | null>(null);
  const endpoint = process.env.HELIUS_API_KEY || clusterApiUrl('devnet');

  useEffect(() => {
    const initializeUmi = async () => {
      try {
        const umiInstance = createUmi(endpoint)
          .use(walletAdapterIdentity(wallet))
          .use(mplCore());

        setUmi(umiInstance);
      } catch (error) {
        console.error('Failed to initialize Umi:', error);
        setUmi(null);
      }
    };

    if (wallet.publicKey) {
      initializeUmi();
    } else {
      setUmi(null);
    }

    return () => {
      setUmi(null);
    };
  }, [wallet.publicKey, endpoint]);

  return umi;
};
