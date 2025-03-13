"use client";
import { useState, useMemo, useCallback } from "react";
import "./globals.css";
import StakingModal from "@/components/Modals/Modal";
import UnstackedTab from "@/components/UnstackedTab";
import StackedTab from "@/components/StackedTab";
import WarningModal from "@/components/Modals/WarningModal";
import { useAccount } from "wagmi";
import { getHighestTierStone } from "@/lib/utils";
import { useStoneManagement } from "@/hooks/useStoneManagement";
import TabSelector from "@/components/TabSelector";
import { TabType, StoneAction } from "@/types";
import { useAbstractClient } from "@abstract-foundation/agw-react";
import { stakeStones } from "@/contractCalls/stakeStones";
import Header from "@/components/Header";
import UserStats from "@/components/UserStats";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.UNSTAKED);

  const { address } = useAccount();
  const { data: agwClient } = useAbstractClient();

  const {
    unstakedStones,
    stakedStones,
    setUnstakedStones,
    setStakedStones,
    unstakedCount,
    stakedCount,
    loading,
  } = useStoneManagement(address);

  const selectedUnstakedStones = useMemo(
    () => unstakedStones.filter((stone) => stone.selected),
    [unstakedStones],
  );

  const selectedStakedStones = useMemo(
    () => stakedStones.filter((stone) => stone.selected),
    [stakedStones],
  );

  const hasSelectedUnstakedStones = useMemo(
    () => selectedUnstakedStones.length > 0,
    [selectedUnstakedStones],
  );

  const hasSelectedStakedStones = useMemo(
    () => selectedStakedStones.length > 0,
    [selectedStakedStones],
  );

  const selectedStones = useMemo(
    () =>
      activeTab === TabType.UNSTAKED
        ? selectedUnstakedStones
        : selectedStakedStones,
    [activeTab, selectedUnstakedStones, selectedStakedStones],
  );

  const areAllStonesSelected = useCallback((): boolean => {
    if (activeTab === TabType.UNSTAKED) {
      return (
        unstakedStones.length > 0 &&
        unstakedStones.every((stone) => stone.selected)
      );
    } else {
      const unlockedStones = stakedStones.filter((stone) => !stone.locked);
      return (
        unlockedStones.length > 0 &&
        unlockedStones.every((stone) => stone.selected)
      );
    }
  }, [activeTab, unstakedStones, stakedStones]);

  const handleSelectStone = useCallback(
    (stoneId: number): void => {
      if (activeTab === TabType.UNSTAKED) {
        setUnstakedStones((prevStones) =>
          prevStones.map((stone) => ({
            ...stone,
            selected: stone.id === stoneId ? !stone.selected : stone.selected,
          })),
        );
      } else {
        setStakedStones((prevStones) =>
          prevStones.map((stone) => ({
            ...stone,
            selected:
              stone.id === stoneId && !stone.locked
                ? !stone.selected
                : stone.selected,
          })),
        );
      }
    },
    [activeTab, setUnstakedStones, setStakedStones],
  );

  const handleStake = useCallback((): void => {
    if (!hasSelectedUnstakedStones) return;
    setIsModalOpen(true);
  }, [hasSelectedUnstakedStones]);

  const handleUnstake = useCallback((): void => {
    if (!hasSelectedStakedStones) return;

    const highestTierStone = getHighestTierStone(stakedStones);
    const isHighestTierStoneSelected = selectedStakedStones.some(
      (stone) => stone.id === highestTierStone.id,
    );

    if (isHighestTierStoneSelected) {
      setIsWarningModalOpen(true);
      return;
    }

    setIsModalOpen(true);
  }, [selectedStakedStones, hasSelectedStakedStones, stakedStones]);

  const handleSelectAll = useCallback((): void => {
    if (activeTab === TabType.UNSTAKED) {
      const allSelected = areAllStonesSelected();
      setUnstakedStones((prevStones) =>
        prevStones.map((stone) => ({
          ...stone,
          selected: !allSelected,
        })),
      );
    } else {
      const unlockedStakedStones = stakedStones.filter(
        (stone) => !stone.locked,
      );
      const allUnlockedSelected = unlockedStakedStones.every(
        (stone) => stone.selected,
      );
      setStakedStones((prevStones) =>
        prevStones.map((stone) => {
          if (!stone.locked) {
            return {
              ...stone,
              selected: !allUnlockedSelected,
            };
          }
          return stone;
        }),
      );
    }
  }, [
    activeTab,
    areAllStonesSelected,
    stakedStones,
    setUnstakedStones,
    setStakedStones,
  ]);

  const handleModalConfirm = useCallback(async () => {
    if (!agwClient) return;

    const transactionHash = await stakeStones(selectedStones, agwClient);
    console.log("Transaction hash:", transactionHash);

    setIsModalOpen(false);
  }, [agwClient, selectedStones]);

  return (
    <main className="min-h-screen w-full flex justify-center items-center p-2">
      <div className="max-w-7xl w-full text-offwhite font-beaufort flex-col">
        <Header />

        <UserStats />

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
          selectedStones={selectedStones}
          mode={
            activeTab === TabType.UNSTAKED
              ? StoneAction.STAKE
              : StoneAction.UNSTAKE
          }
          onConfirm={handleModalConfirm}
        />

        {/* Status and Actions */}
        <div className="flex justify-between items-center">
          <TabSelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            unstakedCount={unstakedCount}
            stakedCount={stakedCount}
          />

          <div className="flex gap-6 text-light_gold text-sm">
            {activeTab === TabType.UNSTAKED && (
              <>
                <button onClick={handleSelectAll}>
                  {areAllStonesSelected() ? "DESELECT ALL" : "SELECT ALL"}
                </button>
                <button
                  className={`relative px-14 py-2 ${
                    hasSelectedUnstakedStones
                      ? "bg-activated-button"
                      : "bg-button-glow"
                  } bg-full bg-center bg-no-repeat`}
                  onClick={handleStake}
                >
                  STAKE
                </button>
              </>
            )}
            {activeTab === TabType.STAKED && (
              <>
                <button onClick={handleSelectAll}>
                  {areAllStonesSelected() ? "DESELECT ALL" : "SELECT ALL"}
                </button>
                <button
                  className={`relative px-14 py-2 ${
                    hasSelectedStakedStones
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
        ) : activeTab === TabType.UNSTAKED ? (
          <UnstackedTab
            stones={unstakedStones}
            handleSelectStone={handleSelectStone}
          />
        ) : (
          <StackedTab
            stones={stakedStones}
            handleSelectStone={handleSelectStone}
          />
        )}
      </div>
    </main>
  );
}
