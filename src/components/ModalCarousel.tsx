import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ArrowNextSVG from "../../public/svgs/ArrowNext.svg";
import ArrowPrevSVG from "../../public/svgs/ArrowPrev.svg";
import useEmblaCarousel from "embla-carousel-react";

interface Stone {
  id: string | number;
  imgSrc: string;
}

interface StoneDisplayProps {
  stoneSrc: string;
  stoneAlt: string;
}

interface ModalCarouselProps {
  selectedStones: Stone[];
  StoneDisplay: React.ComponentType<StoneDisplayProps>;
}

export function ModalCarousel({
  selectedStones,
  StoneDisplay,
}: ModalCarouselProps) {
  const [api, setApi] =
    React.useState<ReturnType<typeof useEmblaCarousel>[1]>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  // Update scroll buttons visibility when the carousel state changes
  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    // Initial check
    onSelect();

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="mt-11">
      <Carousel
        className="w-full max-w-[700px]"
        setApi={setApi}
        opts={{
          align: "center",
          loop: false,
          skipSnaps: false,
          dragFree: false,
          containScroll: "trimSnaps",
        }}
      >
        <CarouselContent className="mr-5 ml-2">
          {selectedStones.map((stone) => (
            <CarouselItem
              key={stone.id}
              className="pl-4 basis-1/3 flex justify-center"
            >
              <StoneDisplay
                stoneSrc={stone.imgSrc}
                stoneAlt={`Stone ${stone.id}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {canScrollPrev && (
          <div
            className="absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={scrollPrev}
          >
            <ArrowPrevSVG />
          </div>
        )}
        {canScrollNext && (
          <div
            className="absolute h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={scrollNext}
          >
            <ArrowNextSVG />
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default ModalCarousel;
