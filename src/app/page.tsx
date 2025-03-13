"use client";
import { useState, useEffect } from "react";
import { UnStakedStone } from "../types";
import "./globals.css";
import { CircleX } from "lucide-react";
import { stonesList } from "@/constants";
import SeperatorSVG from "../../public/svgs/seperator.svg";
import StakingModal from "@/components/Modals/Modal";
import UnstackedTab from "@/components/UnstackedTab";
import StackedTab from "@/components/StackedTab";
import WarningModal from "@/components/Modals/WarningModal";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import { fetchStones } from "@/lib/indexer/graphql-indexer";
import { getHighestTierStone } from "@/lib/utils";

export default function Home() {
  const [username] = useState<string>("USERNAME");
  const [points] = useState<string>("0000");
  const [multiplier] = useState<string>("0000");
  const [unstakedCount, setUnstakedCount] = useState<number>(0);
  const [stakedCount, setStakedCount] = useState<number>(0);
  const [stones, setStones] = useState<UnStakedStone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"unstacked" | "staked">(
    "unstacked",
  );

  const { address } = useAccount();
  const { login, logout } = useLoginWithAbstract();

  useEffect(() => {
    const loadStones = async () => {
      if (address) {
        setLoading(true);
        try {
          const { unstakedStones, unstakedCount } = await fetchStones(address);

          const formattedStones = unstakedStones.map(
            (stone: UnStakedStone) => ({
              ...stone,
              selected: false,
            }),
          );

          setStones(formattedStones);

          // const stakedStones = formattedStones.filter((stone) => stone.staked);
          // setStakedCount(stakedStones.length);
          // setUnstakedCount(formattedStones.length - stakedStones.length);
          setUnstakedCount(unstakedCount);
          setStakedCount(0);
        } catch (error) {
          console.error("Error fetching stones:", error);
          // setStones(
          //   (stonesList as UnStakedStone[]).map((stone: UnStakedStone) => ({
          //     ...stone,
          //     selected: false,
          //   })),
          // );
          setUnstakedCount(stonesList.length);
          setStakedCount(0);
        } finally {
          setLoading(false);
        }
      }
    };

    loadStones();
  }, [address]);

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

  const handleUnstake = (): void => {
    const selectedStones = stones.filter((stone) => stone.selected);
    if (selectedStones.length === 0) return;
    if (
      selectedStones.some(
        (stone) => stone.tier === getHighestTierStone(selectedStones).tier,
      )
    ) {
      setIsWarningModalOpen(true);
      return;
    }
    setIsModalOpen(true);
  };

  const handleSelectAll = (): void => {
    if (activeTab === "unstacked") {
      // For unstacked tab, keep the original behavior
      const allSelected = areAllStonesSelected();
      setStones((prevStones) =>
        prevStones.map((stone) => ({
          ...stone,
          selected: !allSelected,
        })),
      );
    } else {
      // // For staked tab, only select/deselect unlocked stones
      // const unlockedStakedStones = stones.filter(
      //   (stone) => stone.staked && !stone.locked,
      // );
      // const allUnlockedSelected = unlockedStakedStones.every(
      //   (stone) => stone.selected,
      // );
      // setStones((prevStones) =>
      //   prevStones.map((stone) => {
      //     // Only modify selection state for unlocked staked stones
      //     if (stone.staked && !stone.locked) {
      //       return {
      //         ...stone,
      //         selected: !allUnlockedSelected,
      //       };
      //     }
      //     return stone;
      //   }),
      // );
    }
  };

  return (
    <main className="min-h-screen w-full flex justify-center items-center p-2">
      <div className="max-w-7xl w-full text-offwhite font-beaufort flex-col">
        {/* Header */}
        <div className="flex justify-between items-center">
          {!address ? (
            <div
              className="text-dark_purple bg-gradient-to-b from-[#CC913D] to-[#FCC970] px-3 py-1.5 rounded-sm border-1 border-gold_dark cursor-pointer"
              onClick={login}
            >
              CONNECT WALLET
            </div>
          ) : (
            <div className="text-dark_purple bg-gradient-to-b from-[#CC913D] to-[#FCC970] px-3 py-1.5 rounded-sm border-1 border-gold_dark cursor-pointer">
              {/* {address} */}
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          )}
          <div className="items-center cursor-pointer" onClick={logout}>
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

        <WarningModal
          isOpen={isWarningModalOpen}
          setIsOpen={setIsWarningModalOpen}
          onConfirm={() => {
            setIsWarningModalOpen(false);
            setIsModalOpen(true);
          }}
        />

        <StakingModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          selectedStones={stones.filter((stone) => stone.selected)}
          mode={activeTab === "unstacked" ? "stake" : "unstake"}
          onConfirm={() => {
            if (activeTab === "unstacked") {
              const selectedCount = stones.filter(
                (stone) => stone.selected,
              ).length;

              // setStones((prevStones) =>
              //   prevStones.map((stone) => ({
              //     ...stone,
              //     staked: stone.selected ? true : stone.staked,
              //     locked: stone.selected ? Math.random() > 0.5 : stone.locked,
              //     selected: false,
              //   })),
              // );

              setUnstakedCount((prev) => prev - selectedCount);
              setStakedCount((prev) => prev + selectedCount);
            } else {
              const selectedCount = stones.filter(
                (stone) => stone.selected,
              ).length;

              // setStones((prevStones) =>
              //   prevStones.map((stone) => ({
              //     ...stone,
              //     staked: stone.selected ? false : stone.staked,
              //     selected: false,
              //   })),
              // );

              setUnstakedCount((prev) => prev + selectedCount);
              setStakedCount((prev) => prev - selectedCount);
            }

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
                  onClick={handleUnstake}
                >
                  UNSTAKE
                </button>
              </>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-gold_dark mt-3 mb-14"></div>

        {/* Tab Content */}
        {loading ? (
          <div className="flex justify-center items-center h-[404px]">
            <p className="text-gold font-beaufort text-2xl">
              Loading your stones...
            </p>
          </div>
        ) : activeTab === "unstacked" ? (
          <UnstackedTab
            stones={stones}
            // stones={stones.filter((stone) => !stone.staked)}
            handleSelectStone={handleSelectStone}
          />
        ) : (
          <StackedTab
            stones={stones.filter((stone) => stone.staked)}
            handleSelectStone={handleSelectStone}
          />
        )}
      </div>
    </main>
  );
}
