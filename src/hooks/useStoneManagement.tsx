import { useEffect } from "react";
import { StakedStone, UnStakedStone } from "@/types";
import { useState } from "react";
import { fetchStones } from "@/lib/indexer/graphql-indexer";

export function useStoneManagement(address: string | undefined) {
  const [unstakedStones, setUnstakedStones] = useState<UnStakedStone[]>([]);
  const [stakedStones, setStakedStones] = useState<StakedStone[]>([]);
  const [unstakedCount, setUnstakedCount] = useState<number>(0);
  const [stakedCount, setStakedCount] = useState<number>(0);
  const [currentSeasonId, setCurrentSeasonId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStones = async () => {
      if (!address) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const {
          unstakedStones,
          stakedStones,
          unstakedCount,
          stakedCount,
          currentSeasonId,
        } = await fetchStones(address);

        setUnstakedStones(unstakedStones);
        setStakedStones(stakedStones);
        setUnstakedCount(unstakedCount);
        setStakedCount(stakedCount);
        setCurrentSeasonId(currentSeasonId);
      } catch (error) {
        console.error("Error fetching stones:", error);
        // Fallback handling
      } finally {
        setLoading(false);
      }
    };

    loadStones();
  }, [address]);

  return {
    unstakedStones,
    setUnstakedStones,
    stakedStones,
    setStakedStones,
    unstakedCount,
    stakedCount,
    currentSeasonId,
    loading,
  };
}
