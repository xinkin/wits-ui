import Image from "next/image";
import { cn } from "@/lib/utils";

interface StoneDisplayProps {
  stoneSrc: string;
  stoneAlt?: string;
  width?: number;
  height?: number;
  selected?: boolean;
  cardTitle?: "top" | "bottom";
}

export default function StoneDisplayLarge({
  stoneSrc,
  stoneAlt = "Stone",
  selected = false,
  cardTitle = "bottom",
}: StoneDisplayProps) {
  return (
    <div
      className={cn(
        "w-[404px] h-[404px] flex-shrink-0 relative bg-stone-lg bg-center bg-no-repeat",
        selected ? "bg-smoke-active-outline" : "bg-smoke-outline",
      )}
    >
      <div className="h-full flex flex-col items-center justify-center">
        {cardTitle === "top" && (
          <div
            className={
              "absolute top-2 left-1/2 transform -translate-x-1/2 text-center text-xs text-grey mt-2"
            }
          >
            YOUR HIGHEST STONE
          </div>
        )}
        <Image
          src={stoneSrc}
          alt={`Stone ${stoneAlt}`}
          width={330}
          height={330}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {cardTitle === "bottom" && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center text-xs text-grey">
          YOUR HIGHEST STONE
        </div>
      )}
    </div>
  );
}
