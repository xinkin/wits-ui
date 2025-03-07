import Image from "next/image";

interface StoneDisplayProps {
  stoneSrc: string;
  stoneAlt?: string;
  width?: number;
  height?: number;
}

export default function StoneDisplayLarge({
  stoneSrc,
  stoneAlt = "Stone",
}: StoneDisplayProps) {
  return (
    <div className="w-[404px] h-[404px] flex-shrink-0 relative bg-smoke-outline bg-stone-lg bg-center bg-no-repeat">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-center text-xs text-grey mt-2">
          YOUR HIGHEST STONE
        </div>
        <Image
          src={stoneSrc}
          alt={`Stone ${stoneAlt}`}
          width={330}
          height={330}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
