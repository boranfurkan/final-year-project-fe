import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { mainnet, sepolia } from 'wagmi/chains';

export const IS_TESTNET = true;

export const SUPPORTED_CHAINS = {
  ethereum: {
    id: IS_TESTNET ? sepolia.id : mainnet.id,
    name: IS_TESTNET ? 'Sepolia' : 'Ethereum',
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
