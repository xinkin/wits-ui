export const tierPriority = {
  Mythic: 1,
  Legendary: 2,
  Rare: 3,
  Uncommon: 4,
  Common: 5,
};

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
  tier: "Mythic" | "Legendary" | "Rare" | "Uncommon" | "Common";
  multiplier: string;
  selected?: boolean;
}

export interface StakedStone {
  id: number;
  tokenId: string;
  contractAddress: string;
  imgSrc: string;
  tier: "Mythic" | "Legendary" | "Rare" | "Uncommon" | "Common";
  locked?: boolean;
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

export enum TabType {
  UNSTAKED = "unstacked",
  STAKED = "staked",
}

export enum StoneAction {
  STAKE = "stake",
  UNSTAKE = "unstake",
}
