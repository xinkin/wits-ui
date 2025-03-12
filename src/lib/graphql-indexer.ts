import { erc721Abi } from "viem";
import { UnStakedStone } from "../types";
import { publicClient } from "@/components/AbstractProvider";
import { fetchMetadataFromUrl } from "./helper";
// Replace this URL with your actual GraphQL endpoint
const GRAPHQL_ENDPOINT = "http://localhost:42069/graphql";

export async function fetchStones(
  address: string,
): Promise<{ unstakedStones: UnStakedStone[]; unstakedCount: number }> {
  // Define query with proper variable declaration
  const query = `
query FetchUserStones($address: String!) {
users(where: {address: $address}) {
   items {
      ownedNfts {
        items {
          nftTokenId
          nftContractAddress
          id
        }
        totalCount
      }
      stakes(where: {isStaked: true}) {
        items {
          seasonId
          nft {
            tokenId
            nftContract {
              contract
            }
          }
        }
      }
    }
}
}
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
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

  // Extract and transform the data into Stone[] format
  // This assumes your Stone type matches this structure
  // You may need to adjust this based on your actual Stone type
  const unstakedStones: UnStakedStone[] = [];
  const unstakedCount = data.data.users.items[0].ownedNfts.totalCount;

  // Process owned NFTs
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
          ?.value as "Legendary" | "Epic" | "Uncommon" | "Common",
        multiplier: metadata.attributes.find(
          (attr) => attr.trait_type === "Multiplier",
        )?.value as string,
      });
    }
  }

  // Process staked NFTs
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
