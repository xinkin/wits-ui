// types/index.ts

// Define tier priority order
export const tierPriority = {
  Legendary: 1,
  Epic: 2,
  Uncommon: 3,
  Common: 4,
};
export interface Stone {
  id: number;
  imgSrc: string;
  staked: boolean;
  selected?: boolean;
  locked?: boolean;
  tier: "highest" | "epic" | "rare" | "common";
}

export interface UserStats {
  username: string;
  points: string;
  multiplier: string;
}

export interface UnStakedStone {
  id: number;
  tokenId: string;
  contractAddress: string;
  imgSrc: string;
  tier: "Legendary" | "Epic" | "Uncommon" | "Common";
  multiplier: string;
  selected?: boolean;
}

export interface GenesisStoneMetadata {
  dna: string;
  name: string;
  description: string;
  image: string;
  animation_url: string;
  edition: number;
  date: number;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}
