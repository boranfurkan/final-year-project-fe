export type FEATURED_CREATIONS_TYPE = {
  id: number;
  title: string;
  prompt: string;
  chain: string;
  chainTicker: 'ETH' | 'SOL' | 'SUI';
  creator: string;
  image: string;
}[];
