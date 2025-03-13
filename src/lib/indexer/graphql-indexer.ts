import { erc721Abi } from "viem";
import { StakedStone, UnStakedStone } from "../../types";
import { publicClient } from "@/components/AbstractProvider";
import { fetchMetadataFromUrl } from "./getMetadata";
import { fetchStonesQuery } from "./queries";
import { GRAPHQL_ENDPOINT } from "@/constants";

export async function fetchStones(address: string): Promise<{
  unstakedStones: UnStakedStone[];
  stakedStones: StakedStone[];
  unstakedCount: number;
  stakedCount: number;
  currentSeasonId: number;
}> {
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
  const stakedStones: StakedStone[] = [];
  const unstakedCount = data.data.users.items[0].ownedNfts.totalCount;
  const stakedCount = data.data.users.items[0].stakes.totalCount;
  const currentSeasonId = data.data.globalStates.items[0].currentSeasonId;

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
            selected: false,
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
  if (data.data.users.items[0].stakes) {
    const stakes = data.data.users.items[0].stakes.items;

    // Prepare multicall requests for tokenURIs of staked NFTs
    const stakedTokenURICalls = stakes.map(
      (stake: {
        nft: { id: string; tokenId: string; nftContract: { contract: string } };
      }) => ({
        address: stake.nft.nftContract.contract,
        abi: erc721Abi,
        functionName: "tokenURI",
        args: [stake.nft.tokenId],
      }),
    );

    // Execute multicall for staked NFTs
    const stakedTokenURIs = await publicClient.multicall({
      contracts: stakedTokenURICalls,
      allowFailure: true,
    });

    // Fetch metadata in parallel
    const stakedMetadataPromises = stakedTokenURIs.map((result, index) => {
      if (result.status === "success") {
        return fetchMetadataFromUrl(result.result as string);
      }
      console.error(
        `Failed to fetch tokenURI for staked NFT ${stakes[index].nft.tokenId}: ${result.error}`,
      );
      return null;
    });

    const stakedMetadataResults = await Promise.all(stakedMetadataPromises);

    // Process results
    stakes.forEach(
      (
        stake: {
          id: number;
          contractStakeId: string;
          seasonId: number;
          startTime: string;
          nft: { tokenId: string; id: string };
        },
        index: number,
      ) => {
        const metadata = stakedMetadataResults[index];
        if (metadata) {
          stakedStones.push({
            id: stake.id,
            tokenId: stake.contractStakeId,
            contractAddress: stake.nft.id,
            locked: currentSeasonId <= stake.seasonId,
            selected: false,
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

  return {
    unstakedStones,
    stakedStones,
    unstakedCount,
    stakedCount,
    currentSeasonId,
  };
}
