"use client";
import { useState } from "react";
import Image from "next/image";
import { Stone } from "../types";
import "./globals.css";
import { CircleX } from "lucide-react";
import { stonesList } from "@/constants";

export default function Home() {
  const [username] = useState<string>("USERNAME");
  const [points] = useState<string>("0000");
  const [multiplier] = useState<string>("0000");
  const [unstakedCount, setUnstakedCount] = useState<number>(9);
  const [stakedCount, setStakedCount] = useState<number>(0);
  const [stones, setStones] = useState<Stone[]>(stonesList as Stone[]);

  const handleSelectStone = (stoneId: number): void => {
    setStones((prevStones) =>
      prevStones.map((stone) => ({
        ...stone,
        selected: stone.id === stoneId ? !stone.selected : stone.selected,
      })),
    );
  };

  const handleStake = (): void => {
    // Find selected stones
    const selectedStones = stones.filter((stone) => stone.selected);

    if (selectedStones.length === 0) return;

    // Find highest tier stone among selected
    const tiers: Record<Stone["tier"], number> = {
      highest: 4,
      epic: 3,
      rare: 2,
      common: 1,
    };

    const highestTierStone = selectedStones.reduce(
      (highest, current) =>
        tiers[current.tier] > tiers[highest.tier] ? current : highest,
      selectedStones[0],
    );

    // Update only the highest tier stone to staked
    setStones((prevStones) =>
      prevStones.map((stone) => ({
        ...stone,
        staked: stone.id === highestTierStone.id ? true : stone.staked,
        selected: false, // Deselect all stones
      })),
    );

    // Update counts
    setUnstakedCount((prev) => prev - 1);
    setStakedCount((prev) => prev + 1);
  };

  const handleSelectAll = (): void => {
    setStones((prevStones) =>
      prevStones.map((stone) => ({
        ...stone,
        selected: !stone.staked, // Select all unstaked stones
      })),
    );
  };

  // Get the highest stone
  const highestStone = stones.find((stone) => stone.tier === "highest");

  // Get all other stones
  const otherStones = stones.filter((stone) => stone.tier !== "highest");

  return (
    <main className="min-h-screen w-full flex justify-center items-center p-2">
      <div className="max-w-7xl w-full text-offwhite font-beaufort flex-col items-stretch">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-gold_dark">CONNECT WALLET</div>
          <div className="items-center cursor-pointer">
            <CircleX size={38} color="#C0883A" strokeWidth={0.75} />
          </div>
        </div>

        {/* Title */}
        <div className="relative mb-6">
          <h1 className="text-[44px] text-center text-gold">
            SEASON 0 MULTIPLIER PAGE
          </h1>
          <p className="text-center text-[16px] font-lato text-offwhite">
            Stake your Stones to Earn your Multiplier and additional Points!
          </p>
        </div>

        {/* User Stats */}
        <div className="bg-background rounded-md p-4 mb-8 w-[350px] border-border border-2 text-sm">
          <p className="mb-4 text-gold">{username}</p>
          <div className="space-y-1">
            <div className="flex items-center text-offwhite">
              <span>POINTS:</span>
              <span className="text-grey_text ml-2">{points}</span>
            </div>
            <div className="flex items-center">
              <span>MULTIPLIER:</span>
              <span className="text-grey_text ml-2">{multiplier}</span>
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex justify-between items-center">
          <div className="text-2xl">
            <span className="text-gold_dark">UNSTAKED {unstakedCount}</span>
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-grey">STAKED {stakedCount}</span>
          </div>

          <div className="flex gap-6 text-light_gold text-sm">
            <button onClick={handleSelectAll}>SELECT ALL</button>
            <button
              className="relative px-14 py-2"
              style={{
                backgroundImage: "url('/buttonglow.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={handleStake}
            >
              STAKE
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-gold_dark mt-3 mb-14"></div>

        {/* Stone Grid */}
        <div className="flex gap-6">
          {/* Highest Stone */}
          {highestStone && (
            <div
              className="w-[404px] h-[404px] flex-shrink-0 relative"
              style={{
                backgroundImage: `url('/Smoke.png'), url('/Outline.png')`,
                backgroundSize: "387px 387px, 404px 404px",
                backgroundRepeat: "no-repeat, no-repeat",
                backgroundPosition: "center, center",
              }}
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
            <div className="grid grid-cols-4 gap-7">
              {otherStones.map((stone) => (
                <div
                  key={stone.id}
                  className={`stone-item relative w-[188px] h-[188px] ${
                    stone.selected ? "selected" : ""
                  }`}
                  style={{
                    backgroundImage: `url('/Smoke.png'), url('/Outline1.png')`,
                    backgroundSize: "180px 180px, 188px 188px",
                    backgroundPosition: "center, center",
                    backgroundRepeat: "no-repeat, no-repeat",
                  }}
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
      </div>
    </main>
  );
}
