import { erc721Abi } from "viem";
import { UnStakedStone } from "../../types";
import { publicClient } from "@/components/AbstractProvider";
import { fetchMetadataFromUrl } from "./getMetadata";
import { fetchStonesQuery } from "./queries";

const GRAPHQL_ENDPOINT = "http://localhost:42069/graphql";

export async function fetchStones(
  address: string,
): Promise<{ unstakedStones: UnStakedStone[]; unstakedCount: number }> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: fetchStonesQuery,
      variables: { address },
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  const unstakedStones: UnStakedStone[] = [];
  const unstakedCount = data.data.users.items[0].ownedNfts.totalCount;

  // Unstaked Stones
  if (data.data.users.items[0].ownedNfts) {
    for (const nft of data.data.users.items[0].ownedNfts.items) {
      const res = await publicClient.readContract({
        address: nft.nftContractAddress,
        abi: erc721Abi,
        functionName: "tokenURI",
        args: [nft.nftTokenId],
      });
      const metadata = await fetchMetadataFromUrl(res);
      unstakedStones.push({
        id: nft.id,
        tokenId: nft.nftTokenId,
        contractAddress: nft.nftContractAddress,
        imgSrc: metadata.image,
        tier: metadata.attributes.find((attr) => attr.trait_type === "Rarity")
          ?.value as "Mythic" | "Legendary" | "Rare" | "Uncommon" | "Common",
        multiplier: metadata.attributes.find(
          (attr) => attr.trait_type === "Multiplier",
        )?.value as string,
      });
    }
  }

  // Staked Stones
  //   if (user.stakes?.items) {
  //     for (const stake of user.stakes.items) {
  //       stones.push({
  //         id: stake.id,
  //         tokenId: stake.nft?.tokenId,
  //         contractAddress: stake.nft?.id,
  //         staked: true,
  //         stakeId: stake.contractStakeId,
  //         seasonId: stake.seasonId,
  //         startTime: stake.startTime,
  //       });
  //     }
  //   }

  return { unstakedStones, unstakedCount };
}
