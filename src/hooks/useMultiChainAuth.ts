import { useState } from 'react';
import {
  useAuthControllerVerifySignature,
  VerifySignatureRequestDtoChain,
} from '@/api';
import { useAuth } from '@/contexts/AuthContext';
import { ChainType } from '@/types/chain';
import { toast } from 'sonner';
import bs58 from 'bs58';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWallet as useSuiWallet } from '@suiet/wallet-kit';
import { useSignMessage, useAccount } from 'wagmi';
import { useCreateNonce } from './useCreateNonce';

// Map UI chain type to API chain enum
const mapChainToApiEnum = (
  chain: ChainType
): VerifySignatureRequestDtoChain => {
  switch (chain) {
    case 'ethereum':
      return 'ETH';
    case 'solana':
      return 'SOL';
    case 'sui':
      return 'SUI';
    default:
      throw new Error(`Unsupported chain: ${chain}`);
  }
};

export const useMultiChainAuth = (chain: ChainType) => {
  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const [userDeclinedSigning, setUserDeclinedSigning] = useState(false);
  const verifySignature = useAuthControllerVerifySignature();

  const { login: authLogin } = useAuth();
  const generateNonce = useCreateNonce();

  const solanaWallet = useSolanaWallet();
  const suiWallet = useSuiWallet();
  const { signMessageAsync: signEthereumMessage } = useSignMessage();
  const ethereumAccount = useAccount();

  const handleSignIn = async () => {
    // Don't try to sign again if user already declined
    if (userDeclinedSigning) return;

    setIsSigningMessage(true);
    try {
      const nonce = generateNonce();

      let walletAddress: string;
      let signature: string;

      // Chain-specific signing logic
      switch (chain) {
        case 'ethereum': {
          if (!ethereumAccount.address) {
            throw new Error('Ethereum wallet not connected');
          }
          walletAddress = ethereumAccount.address;
          signature = await signEthereumMessage({ message: nonce });
          break;
        }

        case 'solana': {
          if (!solanaWallet.publicKey || !solanaWallet.signMessage) {
            throw new Error(
              'Solana wallet not connected or does not support signing'
            );
          }
          walletAddress = solanaWallet.publicKey.toString();
          const messageEncoded = new TextEncoder().encode(nonce);
          const signatureBytes = await solanaWallet.signMessage(messageEncoded);
          signature = bs58.encode(signatureBytes);
          break;
        }

        case 'sui': {
          if (!suiWallet.account || !suiWallet.signMessage) {
            throw new Error(
              'Sui wallet not connected or does not support signing'
            );
          }
          walletAddress = suiWallet.account.address;
          const signData = await suiWallet.signMessage({
            message: new TextEncoder().encode(nonce),
          });

          signature = signData.signature;
          break;
        }

        default:
          throw new Error(`Unsupported chain: ${chain}`);
      }

      // Verify signature with backend
      const { authToken } = await verifySignature.mutateAsync({
        data: {
          walletAddress,
          nonce,
          signature,
          chain: mapChainToApiEnum(chain),
        },
      });

      // Update auth state
      authLogin(authToken);
      toast.success('Connected successfully');

      // Reset declined state since we succeeded
      setUserDeclinedSigning(false);
    } catch (error: any) {
      console.error('Authentication error:', error);

      // Handle user rejection
      if (
        error.code === 4001 ||
        error.error?.code === 4001 ||
        error.message?.includes('rejected') ||
        error.message?.includes('denied')
      ) {
        setUserDeclinedSigning(true);
        toast('Please sign the message to connect your wallet');
      } else {
        toast.error(
          'Failed to authenticate: ' + (error.message || 'Unknown error')
        );
      }
    } finally {
      setIsSigningMessage(false);
    }
  };

  const resetDeclinedState = () => {
    setUserDeclinedSigning(false);
  };

  return {
    isSigningMessage,
    userDeclinedSigning,
    handleSignIn,
    resetDeclinedState,
  };
};
