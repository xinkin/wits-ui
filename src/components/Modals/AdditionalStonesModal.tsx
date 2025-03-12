import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Stone } from "@/types";
import ExitButtonSVG from "../../../public/svgs/ExitButton.svg";
import ModalCarouselAdditional from "@/components/Modals/ModalCarouselAddiotional";
import GradientLine from "@/components/ui/Stroke";
import StoneDisplaySmall from "@/components/StoneDisplaySmall";
import AddOnsInfo from "@/components/AddOnsInfo";

interface AdditionalStonesModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  additionalStones: Stone[];
  onConfirm: () => void;
}

export default function AdditionalStonesModal({
  isOpen,
  setIsOpen,
  additionalStones,
  onConfirm,
}: AdditionalStonesModalProps) {
  const [selectedStoneId, setSelectedStoneId] = React.useState<
    string | number | null
  >(null);

  const handleStoneSelect = (stoneId: string | number) => {
    setSelectedStoneId(stoneId === selectedStoneId ? null : stoneId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="p-0 border-none bg-transparent shadow-none font-beaufort"
        style={{ width: "1180px", maxWidth: "100%" }}
      >
        <div className="relative flex flex-col items-center px-5 pt-10 pb-16 h-[796px] bg-promptCard-bg bg-cover bg-center">
          <DialogTitle className="text-[32px] text-center text-gold tracking-wider mb-2">
            ADDITIONAL STONES
          </DialogTitle>
          <div className="text-center text-offwhite text-base font-lato mb-14">
            If you unstake this stone during the season you will LOSE earned
            multiplier boost in game.
          </div>
          <GradientLine />

          <ModalCarouselAdditional
            selectedStones={additionalStones}
            StoneDisplaySmall={StoneDisplaySmall}
            onStoneSelect={handleStoneSelect}
            selectedStoneId={selectedStoneId}
          />

          <GradientLine />

          <AddOnsInfo className="mt-6" />

          {/* Stake Button */}
          <button
            onClick={onConfirm}
            className="relative w-[170px] h-[40px] text-light_gold text-base mt-14 bg-button-glow bg-full bg-center bg-no-repeat"
          >
            STAKE
          </button>

          <DialogTrigger asChild>
            <ExitButtonSVG className="absolute top-[-12px] right-[-12px] cursor-pointer" />
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
