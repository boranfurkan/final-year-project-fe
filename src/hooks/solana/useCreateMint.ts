import { generateSigner } from "@metaplex-foundation/umi";
import { useUmi } from "./useUmi";
import { create, ruleSet } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";
import {
  CreateNftMetadataDtoChain,
  nftControllerCreateNftMetadata,
  UserResponseChain,
} from "@/api";

export const useCreateMint = () => {
  const umi = useUmi();

  const createMint = async (metadataUrl: string, nftName: string) => {
    if (!umi) {
      throw new Error("Umi is not initialized");
    }

    const assetSigner = generateSigner(umi);

    const result = await create(umi, {
      asset: assetSigner,
      name: nftName,
      uri: metadataUrl,
      plugins: [
        {
          type: "Royalties",
          basisPoints: 500,
          creators: [
            {
              address: umi.identity.publicKey,
              percentage: 100,
            },
          ],
          ruleSet: ruleSet("None"),
        },
      ],
    }).sendAndConfirm(umi);

    return base58.deserialize(result.signature)[0];
  };

  const uploadSolanaMetadata = async (
    imageURL: string,
    name: string,
    description: string
  ) => {
    const upload = await nftControllerCreateNftMetadata({
      chain: CreateNftMetadataDtoChain.SOL,
      imageUrl: imageURL,
      name: name,
      description: description,
      externalUrl: "https://www.mint-muse.com",
      attributes: [],
    });

    return upload.metadataUrl;
  };

  return { createMint, uploadSolanaMetadata };
};
