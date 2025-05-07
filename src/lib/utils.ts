import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenWalletAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function seperateIPFSId(ipfsUrl: string) {
  const parts = ipfsUrl.split('ipfs://');
  if (parts.length > 1) {
    return parts[1];
  }
  return ipfsUrl;
}

export function getIPFSUrl(ipfsId: string) {
  return `https://gateway.pinata.cloud/ipfs/${ipfsId}`;
}
