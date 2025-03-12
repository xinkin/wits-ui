"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UnStakedStone } from "@/types";
import StoneDisplaySmall from "@/components/StoneDisplaySmall";
import ExitButtonSVG from "../../../public/svgs/ExitButton.svg";
import ModalCarousel from "@/components/Modals/ModalCarousel";
import GradientLine from "@/components/ui/Stroke";

interface StakingModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedStones: UnStakedStone[];
  onConfirm: () => void;
  mode: "stake" | "unstake";
}

export default function StakingModal({
  isOpen,
  setIsOpen,
  selectedStones,
  onConfirm,
  mode,
}: StakingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="p-0 border-none bg-transparent shadow-none font-beaufort"
        style={{ width: "906.178px", maxWidth: "100%" }}
      >
        <div className="relative flex flex-col items-center px-5 pt-10 pb-16 h-[495px] bg-modal-bg bg-cover bg-center">
          <DialogTitle className="text-[36px] text-center text-gold tracking-wider mb-2">
            {mode === "stake"
              ? "CONFIRM YOUR STAKING"
              : "CONFIRM YOUR UNSTAKING"}
          </DialogTitle>
          <GradientLine width="w-[564px]" height="h-[1px]" />

          <ModalCarousel
            selectedStones={selectedStones}
            StoneDisplaySmall={StoneDisplaySmall}
          />

          {/* Stake Button */}
          <button
            onClick={onConfirm}
            className="relative w-[266px] h-[44px] text-light_gold text-base mt-14 bg-activated-button bg-full bg-center bg-no-repeat"
          >
            {mode === "stake" ? "STAKE" : "UNSTAKE"}
          </button>

          <DialogTrigger asChild>
            <ExitButtonSVG className="absolute bottom-[-19px] cursor-pointer" />
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
