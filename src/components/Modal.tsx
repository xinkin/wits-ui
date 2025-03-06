"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import StrokeSVG from "../../public/Stroke.svg";
import { Stone } from "@/types";
import StoneDisplay from "@/components/StoneDisplay";

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
        <div
          className="relative flex flex-col items-center px-5 pt-10 pb-16 h-[495px]"
          style={{
            backgroundImage: "url('/modal-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <DialogTitle className="text-[36px] text-center text-gold tracking-wider mb-2">
            CONFIRM YOUR STAKING
          </DialogTitle>
          <StrokeSVG />

          <div className="flex gap-6 mt-11">
            {selectedStones.map((stone) => (
              <StoneDisplay
                key={stone.id}
                stoneSrc={stone.imgSrc}
                stoneAlt={`Stone ${stone.id}`}
              />
            ))}
          </div>

          {/* Stake Button */}
          <button
            onClick={onConfirm}
            className="relative w-[266px] h-[44px] text-light_gold text-base mt-14"
            style={{
              backgroundImage: "url('/activatedButton.png')",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            STAKE
          </button>

          <DialogTrigger asChild>
            <Image
              src="/ExitButtonModal.png"
              alt="Close"
              width={38}
              height={38}
              className="absolute bottom-[-19px] cursor-pointer"
            />
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
