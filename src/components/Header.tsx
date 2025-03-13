import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { CircleX } from "lucide-react";

import React from "react";
import { useAccount } from "wagmi";

const Header = () => {
  const { address } = useAccount();
  const { login, logout } = useLoginWithAbstract();
  return (
    <>
      <div className="flex justify-between items-center">
        {!address ? (
          <div
            className="text-dark_purple bg-gradient-to-b from-[#CC913D] to-[#FCC970] px-3 py-1.5 rounded-sm border-1 border-gold_dark cursor-pointer"
            onClick={login}
          >
            CONNECT WALLET
          </div>
        ) : (
          <div className="text-dark_purple bg-gradient-to-b from-[#CC913D] to-[#FCC970] px-3 py-1.5 rounded-sm border-1 border-gold_dark cursor-pointer">
            {/* {address} */}
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        )}
        <div className="items-center cursor-pointer" onClick={logout}>
          <CircleX size={38} color="#C0883A" strokeWidth={0.75} />
        </div>
      </div>
      <div className="relative mb-32">
        <h1 className="text-[36px] text-center text-gold tracking-wider">
          SEASON 0 MULTIPLIER PAGE
        </h1>
        <p className="text-center text-[16px] font-lato text-offwhite">
          Stake your Stones to Earn your Multiplier and additional Points!
        </p>
      </div>
    </>
  );
};

export default Header;
