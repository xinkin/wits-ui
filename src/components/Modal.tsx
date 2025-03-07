"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StrokeSVG from "../../public/svgs/Stroke.svg";
import { Stone } from "@/types";
import StoneDisplay from "@/components/StoneDisplaySmall";
import ExitButtonSVG from "../../public/svgs/ExitButton.svg";
import ModalCarousel from "@/components/ModalCarousel";

interface StakingModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedStones: Stone[];
  onConfirm: () => void;
}

export default function StakingModal({
  isOpen,
  setIsOpen,
  selectedStones,
  onConfirm,
}: StakingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="p-0 border-none bg-transparent shadow-none font-beaufort"
        style={{ width: "906.178px", maxWidth: "100%" }}
      >
        <div className="relative flex flex-col items-center px-5 pt-10 pb-16 h-[495px] bg-modal-bg bg-cover bg-center">
          <DialogTitle className="text-[36px] text-center text-gold tracking-wider mb-2">
            CONFIRM YOUR STAKING
          </DialogTitle>
          <StrokeSVG />

          <ModalCarousel
            selectedStones={selectedStones}
            StoneDisplay={StoneDisplay}
          />

          {/* Stake Button */}
          <button
            onClick={onConfirm}
            className="relative w-[266px] h-[44px] text-light_gold text-base mt-14 bg-activated-button bg-full bg-center bg-no-repeat"
          >
            STAKE
          </button>

          <DialogTrigger asChild>
            <ExitButtonSVG className="absolute bottom-[-19px] cursor-pointer" />
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
