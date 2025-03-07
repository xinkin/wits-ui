import React from "react";
import { Stone } from "@/types";
import StoneDisplayLarge from "./StoneDisplayLarge";
import StoneDisplaySmall from "./StoneDisplaySmall";

const UnstackedTab = ({
  stones,
  handleSelectStone,
}: {
  stones: Stone[];
  handleSelectStone: (id: number) => void;
}) => {
  const highestStone = stones.find((stone) => stone.tier === "highest");

  const otherStones = stones.filter((stone) => stone.tier !== "highest");
  return stones.length > 0 ? (
    <div className="flex gap-6">
      {/* Highest Stone */}
      {highestStone && (
        <div onClick={() => handleSelectStone(highestStone.id)}>
          <StoneDisplayLarge
            stoneSrc={highestStone.imgSrc}
            stoneAlt={`Stone ${highestStone.id}`}
            selected={highestStone.selected}
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
