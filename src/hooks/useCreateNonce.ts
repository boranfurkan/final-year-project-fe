import { useState, useCallback } from 'react';

/**
 * A React Hook for generating unique Solana nonces.
 * Nonces are created using current timestamp and a random value.
 * Ensures uniqueness for Solana transactions.
 */
export const useCreateNonce = () => {
  const [nonces, setNonces] = useState<Set<string>>(new Set());

  const generateNonce = useCallback((): string => {
    let nonce: string;
    do {
      // Combine timestamp with a random number for uniqueness
      nonce = `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
    } while (nonces.has(nonce));

    // Store the nonce to ensure uniqueness during the component's lifecycle
    setNonces((prev) => new Set(prev).add(nonce));

    return nonce;
  }, [nonces]);

  return generateNonce;
};
