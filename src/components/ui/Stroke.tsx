import React from "react";

interface GradientLineProps {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
}

const GradientLine: React.FC<GradientLineProps> = ({
  width = "w-full max-w-[1100px]",
  height = "h-[2px]",
  color = "from-[#444444]/0 via-[#444444] to-[#444444]/0",
  className = "",
}) => {
  return (
    <div
      className={`
        ${width} 
        ${height} 
        bg-gradient-to-r 
        ${color}
        mx-auto
        ${className}
      `}
      aria-hidden="true"
    />
  );
};

export default GradientLine;
