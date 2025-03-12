"use client";
import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import { createPublicClient, http } from "viem";
import { abstractTestnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: abstractTestnet,
  transport: http(),
});

export default function AbstractWalletWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = {
    chain: abstractTestnet,
    transport: http(abstractTestnet.rpcUrls.default.http[0]),
  };

  return (
    <AbstractWalletProvider chain={config.chain} transport={config.transport}>
      {children}
    </AbstractWalletProvider>
  );
}
