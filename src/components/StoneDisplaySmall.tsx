import Image from "next/image";

interface StoneDisplayProps {
  stoneSrc: string;
  stoneAlt?: string;
  width?: number;
  height?: number;
  selected?: boolean;
}

export default function StoneDisplaySmall({
  stoneSrc,
  stoneAlt = "Stone",
  selected = false,
}: StoneDisplayProps) {
  return (
    <div
      className={`relative w-[188px] h-[188px] ${
        selected ? "bg-smoke-active-outline" : "bg-smoke-outline1"
      } bg-stone-sm bg-center bg-no-repeat ${selected ? "selected" : ""}`}
    >
      <div className="h-full flex flex-col items-center justify-center">
        <Image
          src={stoneSrc}
          alt={`Stone ${stoneAlt}`}
          width={124}
          height={124}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
