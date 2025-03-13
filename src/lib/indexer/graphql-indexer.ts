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
    const nfts = data.data.users.items[0].ownedNfts.items;

    // Prepare multicall requests for tokenURIs
    const tokenURICalls = nfts.map(
      (nft: { nftContractAddress: string; nftTokenId: string }) => ({
        address: nft.nftContractAddress,
        abi: erc721Abi,
        functionName: "tokenURI",
        args: [nft.nftTokenId],
      }),
    );

    // Execute multicall
    const tokenURIs = await publicClient.multicall({
      contracts: tokenURICalls,
      allowFailure: true,
    });

    // Fetch metadata in parallel
    const metadataPromises = tokenURIs.map((result, index) => {
      if (result.status === "success") {
        return fetchMetadataFromUrl(result.result as string);
      }
      console.error(
        `Failed to fetch tokenURI for NFT ${nfts[index].id}: ${result.error}`,
      );
      return null;
    });

    const metadataResults = await Promise.all(metadataPromises);

    // Process results
    nfts.forEach(
      (
        nft: { id: number; nftTokenId: string; nftContractAddress: string },
        index: number,
      ) => {
        const metadata = metadataResults[index];
        if (metadata) {
          unstakedStones.push({
            id: nft.id,
            tokenId: nft.nftTokenId,
            contractAddress: nft.nftContractAddress,
            imgSrc: metadata.image,
            tier: metadata.attributes.find(
              (attr) => attr.trait_type === "Rarity",
            )?.value as "Mythic" | "Legendary" | "Rare" | "Uncommon" | "Common",
            multiplier: metadata.attributes.find(
              (attr) => attr.trait_type === "Multiplier",
            )?.value as string,
          });
        }
      },
    );
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
