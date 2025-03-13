import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UnStakedStone, StakedStone, tierPriority } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHighestTierStone(stones: UnStakedStone[]) {
  return stones.reduce((highest, current) => {
    return tierPriority[current.tier] < tierPriority[highest.tier]
      ? current
      : highest;
  }, stones[0]);
}

export function getSortedTierStones(stones: StakedStone[]) {
  return stones && stones.length > 0
    ? [...stones].sort((a, b) => {
        const tierPriority = {
          Mythic: 3,
          Legendary: 2,
          Rare: 1,
          Uncommon: 0,
          Common: 0,
        };
        if (tierPriority[a.tier] > tierPriority[b.tier]) return -1;
        if (tierPriority[a.tier] < tierPriority[b.tier]) return 1;
        return 0;
      })
    : [];
}
