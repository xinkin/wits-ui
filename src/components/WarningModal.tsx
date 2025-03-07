import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExitButtonSVG from "../../public/svgs/ExitButton.svg";
import GradientLine from "@/components/Stroke";

interface WarningModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
}

export default function WarningModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: WarningModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="p-0 border-none bg-transparent shadow-none font-beaufort"
        style={{ width: "906.178px", maxWidth: "100%" }}
      >
        <div className="relative flex flex-col items-center px-5 pt-10 pb-16 h-[495px] bg-modal-bg bg-cover bg-center">
          <div className="flex flex-col items-center justify-center h-full">
            <DialogTitle className="text-[36px] text-center text-gold tracking-wider mb-4">
              WARNING
            </DialogTitle>

            <GradientLine width="w-[564px]" height="h-[1px]" />

            <div className="text-center text-offwhite text-base font-lato mt-10">
              If you unstake the highest stone during the season you will LOSE
              earned
              <br />
              multiplier boost in game.
            </div>

            <button
              onClick={onConfirm}
              className="relative w-[266px] h-[44px] text-light_gold text-base mt-16 bg-activated-button bg-full bg-center bg-no-repeat"
            >
              CONTINUE
            </button>
          </div>

          <DialogTrigger asChild>
            <ExitButtonSVG className="absolute bottom-[-19px] cursor-pointer" />
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
