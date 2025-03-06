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

export default function StakingModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
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
          <DialogTitle className="text-[32px] text-center text-gold tracking-wider">
            CONFIRM YOUR STAKING
          </DialogTitle>
          <StrokeSVG />

          <div className="relative z-10 w-[120px] h-[120px] mb-8 bg-black border border-purple-700 overflow-hidden">
            <div className="absolute inset-0 bg-purple-900/30"></div>
          </div>

          {/* Stake Button */}
          <button
            className="relative w-[266px] h-[44px] text-light_gold text-base"
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
