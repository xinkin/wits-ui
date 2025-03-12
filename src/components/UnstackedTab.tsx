import React from "react";
import { UnStakedStone } from "@/types";
import StoneDisplayLarge from "./StoneDisplayLarge";
import StoneDisplaySmall from "./StoneDisplaySmall";
import { getHighestTierStone } from "@/lib/helper";

const UnstackedTab = ({
  stones,
  handleSelectStone,
}: {
  stones: UnStakedStone[];
  handleSelectStone: (id: number) => void;
}) => {
  // Find the highest tier stone based on the priority
  const highestTierStone = getHighestTierStone(stones);

  // Filter out the highest tier stone from other stones
  const otherStones = highestTierStone
    ? stones.filter((stone) => stone.id !== highestTierStone.id)
    : [];

  return stones.length > 0 ? (
    <div className="flex gap-6">
      {/* Highest Tier Stone */}
      {highestTierStone && (
        <div onClick={() => handleSelectStone(highestTierStone.id)}>
          <StoneDisplayLarge
            stoneSrc={highestTierStone.imgSrc}
            stoneAlt={`Stone ${highestTierStone.id}`}
            selected={highestTierStone.selected}
            cardTitle="bottom"
          />
        </div>
      )}

      {/* Other Stones */}
      <div className="flex-1 h-[404px] overflow-scroll pr-4 custom-scrollbar">
        <div className="grid grid-cols-4 gap-7 justify-center items-center">
          {otherStones.map((stone) => (
            <div key={stone.id} onClick={() => handleSelectStone(stone.id)}>
              <StoneDisplaySmall
                stoneSrc={stone.imgSrc}
                stoneAlt={`Stone ${stone.id}`}
                selected={stone.selected}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-[404px]">
      <div className="text-[#B6B0A8] text-center">NO STONES AVAILABLE</div>
    </div>
  );
};

export default UnstackedTab;
