import React from "react";

interface AddOnsInfoProps {
  className?: string;
}

const AddOnsInfo: React.FC<AddOnsInfoProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-full max-w-[840px] h-[130px]mx-auto rounded border border-gray-700 bg-[#0a090f]/80 p-6 ${className}`}
    >
      <h3 className="text-center text-gold text-base font-beaufort mb-[14px]">
        ADDITIONAL STONE STAKED ADDS (MAX = 30X)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base font-lato">
        {/* First column */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline">
            <span className="text-offwhite mr-1">20x</span>
            <span className="text-grey_text"> = +6x (only 1 additional)</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-offwhite mr-1">15</span>
            <span className="text-grey_text"> = +5x (only 1 additional)</span>
          </div>
        </div>

        {/* Second column */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline">
            <span className="text-offwhite mr-1">10</span>
            <span className="text-grey_text">= +4x (only 1 additional)</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-offwhite mr-1">7</span>
            <span className="text-grey_text">= +3x (only 2 additional)</span>
          </div>
        </div>

        {/* Third column */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline">
            <span className="text-offwhite mr-1">5</span>
            <span className="text-grey_text">= +2x (only 3 additional)</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-offwhite mr-1">3</span>
            <span className="text-grey_text">= +1x (any amount)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnsInfo;
