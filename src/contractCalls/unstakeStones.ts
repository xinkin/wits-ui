import { StakedStone } from "@/types";
import { GemstoneStakingAbi } from "@/abi/StakingAbi";
import { GEMSTONE_STAKING_ADDRESS } from "@/constants";

export const unstakeStones = (
  selectedStones: StakedStone[],
  writeContractSponsored: any,
) => {
  console.log(selectedStones.map((stone) => BigInt(stone.tokenId)));
  writeContractSponsored({
    abi: GemstoneStakingAbi,
    address: GEMSTONE_STAKING_ADDRESS as `0x${string}`,
    functionName: "batchUnstakeNFTs",
    args: [selectedStones.map((stone) => BigInt(stone.tokenId))],
  });
};
