import { encodeFunctionData, erc721Abi } from "viem";
import { GEMSTONE_NFT_ADDRESS, GEMSTONE_STAKING_ADDRESS } from "@/constants";
import { UnStakedStone } from "@/types";
import { GemstoneStakingAbi } from "@/abi/StakingAbi";
import { AbstractClient } from "@abstract-foundation/agw-client";

export async function stakeStones(
  selectedStones: UnStakedStone[],
  agwClient: AbstractClient,
) {
  if (!agwClient || !selectedStones.length) return;

  const approvalCalls = selectedStones.map((stone) => ({
    to: GEMSTONE_NFT_ADDRESS as `0x${string}`,
    data: encodeFunctionData({
      abi: erc721Abi,
      functionName: "approve",
      args: [GEMSTONE_STAKING_ADDRESS as `0x${string}`, BigInt(stone.tokenId)],
    }),
  }));

  const stakingCall = {
    to: GEMSTONE_STAKING_ADDRESS as `0x${string}`,
    data: encodeFunctionData({
      abi: GemstoneStakingAbi,
      functionName: "batchStakeNFTs",
      args: [selectedStones.map((stone) => BigInt(stone.tokenId))],
    }),
  };

  console.log([...approvalCalls, stakingCall]);
  const hash = await agwClient.sendTransactionBatch({
    calls: [...approvalCalls, stakingCall],
  });

  return hash;
}
