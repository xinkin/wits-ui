// types/index.ts
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
