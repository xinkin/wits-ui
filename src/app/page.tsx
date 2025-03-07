"use client";
import { useState } from "react";
// import Image from "next/image";
import { Stone } from "../types";
import "./globals.css";
import { CircleX } from "lucide-react";
import { stonesList } from "@/constants";
import SeperatorSVG from "../../public/svgs/seperator.svg";
import StakingModal from "@/components/Modal";
import UnstackedTab from "@/components/UnstackedTab";
import StackedTab from "@/components/StackedTab";

export default function Home() {
  const [username] = useState<string>("USERNAME");
  const [points] = useState<string>("0000");
  const [multiplier] = useState<string>("0000");
  const [unstakedCount, setUnstakedCount] = useState<number>(stonesList.length);
  const [stakedCount, setStakedCount] = useState<number>(0);
  const [stones, setStones] = useState<Stone[]>(
    (stonesList as Stone[]).map((stone: Stone) => ({
      ...stone,
      selected: false,
    })),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"unstacked" | "staked">(
    "unstacked",
  );

  const areAllStonesSelected = (): boolean => {
    return stones.every((stone) => stone.selected);
  };

  const handleSelectStone = (stoneId: number): void => {
    setStones((prevStones) =>
      prevStones.map((stone) => {
        const newSelected =
          stone.id === stoneId ? !stone.selected : stone.selected;
        if (stone.id === stoneId) {
        }
        return {
          ...stone,
          selected: newSelected,
        };
      }),
    );
  };

  const handleStake = (): void => {
    const selectedStones = stones.filter((stone) => stone.selected);
    if (selectedStones.length === 0) return;

    setIsModalOpen(true);

    // Move the stone staking logic to after modal confirmation
    // We'll keep the selected stones in their selected state until confirmed
  };

  const handleSelectAll = (): void => {
    const allSelected = areAllStonesSelected();
    setStones((prevStones) =>
      prevStones.map((stone) => ({
        ...stone,
        selected: !allSelected,
      })),
    );
  };

  return (
    <main className="min-h-screen w-full flex justify-center items-center p-2">
      <div className="max-w-7xl w-full text-offwhite font-beaufort flex-col">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-dark_purple bg-gradient-to-b from-[#CC913D] to-[#FCC970] px-3 py-1.5 rounded-sm border-1 border-gold_dark">
            CONNECT WALLET
          </div>
          <div className="items-center cursor-pointer">
            <CircleX size={38} color="#C0883A" strokeWidth={0.75} />
          </div>
        </div>

        {/* Title */}
        <div className="relative mb-32">
          <h1 className="text-[36px] text-center text-gold tracking-wider">
            SEASON 0 MULTIPLIER PAGE
          </h1>
          <p className="text-center text-[16px] font-lato text-offwhite">
            Stake your Stones to Earn your Multiplier and additional Points!
          </p>
        </div>

        {/* User Stats */}
        <div className="bg-dark_purple rounded-md p-4 mb-8 w-[350px] border-border border-2 text-sm">
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

        <StakingModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          selectedStones={stones.filter((stone) => stone.selected)}
          onConfirm={() => {
            // Move the staking logic here
            setStones((prevStones) =>
              prevStones.map((stone) => ({
                ...stone,
                staked: stone.selected ? true : stone.staked,
                // Randomly set locked status for testing (approximately 50% chance)
                locked: stone.selected ? Math.random() > 0.5 : stone.locked,
                selected: false, // Deselect all stones
              })),
            );

            // Update counts
            const selectedCount = stones.filter(
              (stone) => stone.selected,
            ).length;
            setUnstakedCount((prev) => prev - selectedCount);
            setStakedCount((prev) => prev + selectedCount);

            setIsModalOpen(false);
          }}
        />

        {/* Status and Actions */}
        <div className="flex justify-between items-center">
          <div className="text-2xl flex items-center">
            <span
              className={`cursor-pointer ${
                activeTab === "unstacked" ? "text-gold_dark" : "text-grey"
              }`}
              onClick={() => setActiveTab("unstacked")}
            >
              UNSTAKED {unstakedCount}
            </span>
            <span className="mx-3">
              <SeperatorSVG />
            </span>
            <span
              className={`cursor-pointer ${
                activeTab === "staked" ? "text-gold_dark" : "text-grey"
              }`}
              onClick={() => setActiveTab("staked")}
            >
              STAKED {stakedCount}
            </span>
          </div>

          <div className="flex gap-6 text-light_gold text-sm">
            {activeTab === "unstacked" && (
              <>
                <button onClick={handleSelectAll}>
                  {areAllStonesSelected() ? "DESELECT ALL" : "SELECT ALL"}
                </button>
                <button
                  className={`relative px-14 py-2 ${
                    stones.some((stone) => stone.selected)
                      ? "bg-activated-button"
                      : "bg-button-glow"
                  } bg-full bg-center bg-no-repeat`}
                  onClick={handleStake}
                >
                  STAKE
                </button>
              </>
            )}
            {activeTab === "staked" && (
              <>
                <button onClick={handleSelectAll}>
                  {areAllStonesSelected() ? "DESELECT ALL" : "SELECT ALL"}
                </button>
                <button
                  className={`relative px-14 py-2 ${
                    stones.some((stone) => stone.selected)
                      ? "bg-activated-button"
                      : "bg-button-glow"
                  } bg-full bg-center bg-no-repeat`}
                  onClick={handleStake}
                >
                  UNSTAKE
                </button>
              </>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-gold_dark mt-3 mb-14"></div>

        {/* Tab Content */}
        {activeTab === "unstacked" ? (
          <UnstackedTab
            stones={stones.filter((stone) => !stone.staked)}
            handleSelectStone={handleSelectStone}
          />
        ) : (
          <StackedTab
            stones={stones.filter((stone) => stone.staked)}
            // handleSelectStone={handleSelectStone}
          />
        )}
      </div>
    </main>
  );
}
