import Image from "next/image";

interface StoneDisplayProps {
  stoneSrc: string;
  stoneAlt?: string;
  width?: number;
  height?: number;
}

export default function StoneDisplaySmall({
  stoneSrc,
  stoneAlt = "Stone",
}: StoneDisplayProps) {
  return (
    <div
      className="w-[188px] h-[188px] flex-shrink-0 relative"
      style={{
        backgroundImage: `url('/Smoke.png'), url('/Outline1.png')`,
        backgroundSize: "180px 180px, 188px 188px",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
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
