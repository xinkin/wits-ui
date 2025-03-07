import React from "react";
import Image from "next/image";
import { Stone } from "@/types";

const UnstackedTab = ({
  stones,
  handleSelectStone,
}: {
  stones: Stone[];
  handleSelectStone: (id: number) => void;
}) => {
  const highestStone = stones.find((stone) => stone.tier === "highest");

  const otherStones = stones.filter((stone) => stone.tier !== "highest");
  return (
    <div className="flex gap-6">
      {/* Highest Stone */}
      {highestStone && (
        <div
          className={`w-[404px] h-[404px] flex-shrink-0 relative ${
            highestStone.selected
              ? "bg-smoke-active-outline"
              : "bg-smoke-outline"
          } bg-stone-lg bg-center bg-no-repeat`}
        >
          <div
            className="h-full flex flex-col items-center justify-center"
            onClick={() => handleSelectStone(highestStone.id)}
          >
            <Image
              src={highestStone.imgSrc}
              alt="Highest Stone"
              width={330}
              height={330}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center text-xs text-grey">
              YOUR HIGHEST STONE
            </div>
          </div>
        </div>
      )}

      {/* Other Stones */}
      <div className="flex-1 h-[404px] overflow-scroll pr-4 custom-scrollbar">
        <div className="grid grid-cols-4 gap-7 justify-center items-center">
          {otherStones.map((stone) => (
            <div
              key={stone.id}
              className={`relative w-[188px] h-[188px] ${
                stone.selected ? "bg-smoke-active-outline" : "bg-smoke-outline1"
              } bg-stone-sm bg-center bg-no-repeat ${
                stone.selected ? "selected" : ""
              }`}
              onClick={() => handleSelectStone(stone.id)}
            >
              <Image
                src={stone.imgSrc}
                alt={`Stone ${stone.id}`}
                width={124}
                height={124}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnstackedTab;
