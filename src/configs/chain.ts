import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { mainnet, holesky } from 'wagmi/chains';

export const IS_TESTNET = process.env.NEXT_PUBLIC_IS_TESTNET === '1';

export const SUPPORTED_CHAINS = {
  ethereum: {
    id: IS_TESTNET ? holesky.id : mainnet.id,
    name: 'Ethereum',
    isTestnet: IS_TESTNET,
  },
  solana: {
    id: 999,
    name: 'Solana',
    network: IS_TESTNET
      ? WalletAdapterNetwork.Devnet
      : WalletAdapterNetwork.Mainnet,
    isTestnet: IS_TESTNET,
  },
  sui: {
    id: 1000,
    name: 'Sui',
    network: IS_TESTNET ? 'testnet' : 'mainnet',
    isTestnet: IS_TESTNET,
  },
};
