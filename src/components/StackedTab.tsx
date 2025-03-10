"use client";
import React, { useState } from "react";
import StoneDisplayLarge from "./StoneDisplayLarge";
import StoneDisplaySmall from "./StoneDisplaySmall";
import { Stone } from "@/types";
import { CirclePlus } from "lucide-react";
import LockIcon from "../../public/svgs/LockIcon.svg";
import GBagIcon from "../../public/svgs/GBag.svg";
import AdditionalStonesModal from "./AdditionalStonesModal";

interface StackedTabProps {
  stones: Stone[];
  handleSelectStone?: (stoneId: number) => void;
}

const StackedTab: React.FC<StackedTabProps> = ({
  stones,
  handleSelectStone,
}) => {
  const [isAdditionalStonesModalOpen, setIsAdditionalStonesModalOpen] =
    useState(false);

  const handleAdditionalStones = () => {
    setIsAdditionalStonesModalOpen(true);
  };

  const sortedStones =
    stones && stones.length > 0
      ? [...stones].sort((a, b) => {
          const tierPriority = { highest: 3, epic: 2, rare: 1, common: 0 };
          return tierPriority[a.tier] > tierPriority[b.tier] ? -1 : 1;
        })
      : [];

  const highestStone = sortedStones.length > 0 ? sortedStones[0] : null;
  const otherStones = sortedStones.slice(1, 5);
  const leftStones = [otherStones[0] || null, otherStones[1] || null];
  const rightStones = [otherStones[2] || null, otherStones[3] || null];

  // Create an array of additional stones (stones beyond the first 5)
  const additionalStones = sortedStones.slice(5);

  return (
    <div className="flex justify-center items-center relative">
      <AdditionalStonesModal
        isOpen={isAdditionalStonesModalOpen}
        setIsOpen={setIsAdditionalStonesModalOpen}
        additionalStones={additionalStones}
        onConfirm={() => setIsAdditionalStonesModalOpen(false)}
      />

      {/* Left side stones */}
      <div className="flex gap-4">
        {leftStones.map((stone, index) =>
          stone ? (
            <div
              key={stone.id}
              className="relative"
              onClick={() =>
                stone && !stone.locked && handleSelectStone
                  ? handleSelectStone(stone.id)
                  : undefined
              }
            >
              <StoneDisplaySmall
                stoneSrc={stone.imgSrc}
                stoneAlt={`Stone ${stone.id}`}
                selected={stone.selected}
              />
              {stone.locked && (
                <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2">
                  <LockIcon />
                </div>
              )}
            </div>
          ) : (
            <div
              key={`empty-left-${index}`}
              className="w-[188px] h-[188px] flex relative bg-smoke-outline1 bg-stone-sm bg-center bg-no-repeat justify-center items-center opacity-90"
            >
              <div className="absolute w-[160px] h-[160px] rounded-full bg-[rgba(255,255,185,0.08)] blur-[25px]"></div>
              <CirclePlus
                size="96px"
                color="#4D4D4D"
                strokeWidth={0.75}
                className="opacity-80"
              />
            </div>
          ),
        )}
      </div>

      {/* Center stone (highest tier) */}
      <div className="mx-4">
        {highestStone ? (
          <div
            className="relative"
            onClick={() =>
              highestStone && !highestStone.locked && handleSelectStone
                ? handleSelectStone(highestStone.id)
                : undefined
            }
          >
            <StoneDisplayLarge
              stoneSrc={highestStone.imgSrc}
              stoneAlt={`Stone ${highestStone.id}`}
              selected={highestStone.selected}
              cardTitle="top"
            />
            {highestStone.locked && (
              <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2">
                <LockIcon />
              </div>
            )}
          </div>
        ) : (
          <div className="w-[404px] h-[404px] flex relative bg-smoke-outline bg-stone-lg bg-center bg-no-repeat justify-center items-center opacity-80">
            <div className="absolute w-[330px] h-[330px] rounded-full bg-[rgba(255,255,185,0.08)] blur-[25px]"></div>
            <CirclePlus
              size="158px"
              color="#4D4D4D"
              strokeWidth={0.75}
              className="opacity-80"
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center text-xs text-grey mb-1">
              YOUR HIGHEST STONE
            </div>
          </div>
        )}
      </div>

      {/* Right side stones */}
      <div className="flex gap-4">
        {rightStones.map((stone, index) =>
          stone ? (
            <div
              key={stone.id}
              className="relative"
              onClick={() =>
                stone && !stone.locked && handleSelectStone
                  ? handleSelectStone(stone.id)
                  : undefined
              }
            >
              <StoneDisplaySmall
                stoneSrc={stone.imgSrc}
                stoneAlt={`Stone ${stone.id}`}
                selected={stone.selected}
              />
              {stone.locked && (
                <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2">
                  <LockIcon />
                </div>
              )}
            </div>
          ) : (
            <div
              key={`empty-left-${index}`}
              className="w-[188px] h-[188px] flex relative bg-smoke-outline1 bg-stone-sm bg-center bg-no-repeat justify-center items-center opacity-90"
            >
              <div className="absolute w-[160px] h-[160px] rounded-full bg-[rgba(255,255,185,0.08)] blur-[25px]"></div>
              <CirclePlus
                size="96px"
                color="#4D4D4D"
                strokeWidth={0.75}
                className="opacity-80"
              />
            </div>
          ),
        )}
      </div>
      <div
        className="absolute bottom-[-10px] right-[-10px] cursor-pointer"
        onClick={handleAdditionalStones}
      >
        <GBagIcon />
      </div>
    </div>
  );
};

export default StackedTab;
