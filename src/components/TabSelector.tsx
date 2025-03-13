import React from "react";
import SeperatorSVG from "../../public/svgs/seperator.svg";

enum TabType {
  UNSTAKED = "unstacked",
  STAKED = "staked",
}

interface TabSelectorProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unstakedCount: number;
  stakedCount: number;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  activeTab,
  setActiveTab,
  unstakedCount,
  stakedCount,
}) => {
  return (
    <div className="text-2xl flex items-center">
      <span
        className={`cursor-pointer ${
          activeTab === TabType.UNSTAKED ? "text-gold_dark" : "text-grey"
        }`}
        onClick={() => setActiveTab(TabType.UNSTAKED)}
      >
        UNSTAKED {unstakedCount}
      </span>
      <span className="mx-3">
        <SeperatorSVG />
      </span>
      <span
        className={`cursor-pointer ${
          activeTab === TabType.STAKED ? "text-gold_dark" : "text-grey"
        }`}
        onClick={() => setActiveTab(TabType.STAKED)}
      >
        STAKED {stakedCount}
      </span>
    </div>
  );
};

export default TabSelector;
