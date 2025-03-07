import React, { useState } from "react";
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
  isSelected?: boolean;
  onClick?: () => void;
}

interface ModalCarouselProps {
  selectedStones: Stone[];
  StoneDisplaySmall: React.ComponentType<StoneDisplayProps>;
  onStoneSelect?: (stoneId: string | number) => void;
  selectedStoneId?: string | number | null;
}

export function ModalCarousel({
  selectedStones,
  StoneDisplaySmall,
  onStoneSelect,
  selectedStoneId = null,
}: ModalCarouselProps) {
  const [api, setApi] =
    React.useState<ReturnType<typeof useEmblaCarousel>[1]>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  // Internal selected state if no external handler is provided
  const [internalSelectedId, setInternalSelectedId] = useState<
    string | number | null
  >(null);

  // Use either external or internal selected state
  const currentSelectedId = onStoneSelect
    ? selectedStoneId
    : internalSelectedId;

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleStoneClick = (stoneId: string | number) => {
    if (onStoneSelect) {
      onStoneSelect(stoneId);
    } else {
      setInternalSelectedId(stoneId === internalSelectedId ? null : stoneId);
    }
  };

  const getCarouselOpts = () => {
    const itemCount = selectedStones.length;

    if (itemCount <= 4) {
      return {
        align: "center" as const,
        loop: false,
        skipSnaps: false,
        dragFree: false,
        containScroll: "trimSnaps" as const,
      };
    } else {
      return {
        align: "start" as const,
        loop: false,
        skipSnaps: false,
        dragFree: false,
        containScroll: "trimSnaps" as const,
      };
    }
  };

  const getItemClassName = () => {
    const itemCount = selectedStones.length;

    if (itemCount === 1) {
      return "basis-full flex justify-center items-center";
    } else if (itemCount === 2) {
      return "basis-1/2 flex justify-center items-center";
    } else if (itemCount === 3) {
      return "basis-1/3 flex justify-center items-center";
    } else {
      return "basis-1/4 flex justify-center items-center";
    }
  };

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    onSelect();

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const contentClassName =
    selectedStones.length <= 4 ? "flex justify-center pl-4" : "pl-4";

  return (
    <div className="mt-11 mb-11">
      <Carousel
        className="w-full max-w-[850px] mx-auto"
        setApi={setApi}
        opts={getCarouselOpts()}
      >
        <CarouselContent className={contentClassName}>
          {selectedStones.map((stone) => (
            <CarouselItem
              key={stone.id}
              className={`${getItemClassName()} px-2`}
            >
              <div className="cursor-pointer">
                <StoneDisplaySmall
                  stoneSrc={stone.imgSrc}
                  stoneAlt={`Stone ${stone.id}`}
                  isSelected={currentSelectedId === stone.id}
                  onClick={() => handleStoneClick(stone.id)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {canScrollPrev && (
          <div
            className="absolute h-8 w-8 rounded-full -left-20 top-1/2 -translate-y-1/2 cursor-pointer"
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
