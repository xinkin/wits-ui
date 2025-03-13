import React, { useState } from "react";

const UserStats = () => {
  const [username] = useState<string>("USERNAME");
  const [points] = useState<string>("0000");
  const [multiplier] = useState<string>("0000");

  return (
    <div className="bg-dark_purple rounded-md p-4 mb-8 w-[350px] border-border border-2 text-sm">
      <p className="mb-4 text-gold">{username}</p>
      <div className="space-y-1">
        <div className="flex items-center text-offwhite">
          <span>POINTS:</span>
          <span className="text-grey_text ml-2">{points}</span>
        </div>
        <div className="flex items-center">
          <span>MULTIPLIER:</span>
          <span className="text-grey_text ml-2">{multiplier}</span>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
