import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UnStakedStone, tierPriority } from "@/types";

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
