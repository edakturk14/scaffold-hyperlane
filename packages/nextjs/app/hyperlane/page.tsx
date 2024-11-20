"use client";

import { useState } from "react";
import HypNativeABI from "../../abis/HypNative.json";
import { NextPage } from "next";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

const contracts = {
  HypNativeAnvil1: {
    address: "0x4e85DC48a70DA1298489d5B6FC2492767d98f384", // Contract on anvilchain1
    chainId: 31337, // Chain ID for anvilchain1
  },
  HypNativeAnvil2: {
    address: "0xF1078fD568Ad76E49E6F88D1fF485402a086976b", // Contract on anvilchain2
    chainId: 31338, // Chain ID for anvilchain2
  },
};

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  // Read from HypNativeAnvil1
  const { data: ownerAnvil1, isLoading: isLoadingOwnerAnvil1 } = useReadContract({
    address: contracts.HypNativeAnvil1.address as `0x${string}`,
    abi: HypNativeABI,
    functionName: "owner",
  });

  const { data: mailboxAnvil1, isLoading: isLoadingMailboxAnvil1 } = useReadContract({
    address: contracts.HypNativeAnvil1.address as `0x${string}`,
    abi: HypNativeABI,
    functionName: "mailbox",
  });

  // Read from HypNativeAnvil2
  const { data: ownerAnvil2, isLoading: isLoadingOwnerAnvil2 } = useReadContract({
    address: contracts.HypNativeAnvil2.address as `0x${string}`,
    abi: HypNativeABI,
    functionName: "owner",
  });

  const { data: mailboxAnvil2, isLoading: isLoadingMailboxAnvil2 } = useReadContract({
    address: contracts.HypNativeAnvil2.address as `0x${string}`,
    abi: HypNativeABI,
    functionName: "mailbox",
  });

  const { data: balanceAnvil1, isLoading: isLoadingBalanceAnvil1 } = useReadContract({
    address: contracts.HypNativeAnvil1.address as `0x${string}`, // Address of the HypNative contract on anvilchain1
    abi: HypNativeABI,
    functionName: "balanceOf",
    args: [contracts.HypNativeAnvil1.address], // Contract address itself
  });

  const { data: balanceAnvil2, isLoading: isLoadingBalanceAnvil2 } = useReadContract({
    address: contracts.HypNativeAnvil2.address as `0x${string}`, // Address of the HypNative contract on anvilchain2
    abi: HypNativeABI,
    functionName: "balanceOf",
    args: [contracts.HypNativeAnvil2.address], // Contract address itself
  });

  // Mint tokens for Chain 1
  const { data: txHashChain1, writeContract: writeMintChain1 } = useWriteContract();

  // Mint tokens for Chain 2
  const { data: txHashChain2, writeContract: writeMintChain2 } = useWriteContract();

  // State to manage loading for each chain
  const [isMintingChain1, setIsMintingChain1] = useState(false);
  const [isMintingChain2, setIsMintingChain2] = useState(false);

  // Handlers for minting
  const handleMintOnChain1 = async () => {
    setIsMintingChain1(true);
    try {
      const result = await writeMintChain1({
        abi: HypNativeABI,
        address: contracts.HypNativeAnvil1.address as `0x${string}`,
        functionName: "mint",
        args: [connectedAddress as `0x${string}`, BigInt(100)],
      });
      console.log("Transaction Hash for Chain 1:", result);
    } catch (error) {
      console.error("Minting on Chain 1 failed:", error);
    } finally {
      setIsMintingChain1(false);
    }
  };

  const handleMintOnChain2 = async () => {
    setIsMintingChain2(true);
    try {
      await writeMintChain2({
        abi: HypNativeABI,
        address: contracts.HypNativeAnvil2.address as `0x${string}`,
        functionName: "mint",
        args: [connectedAddress as `0x${string}`, BigInt(100)],
      });
    } catch (error) {
      console.error("Minting on Chain 2 failed:", error);
    } finally {
      setIsMintingChain2(false);
    }
  };

  return (
    <div className="flex items-center flex-col min-h-screen">
      <div className="px-5 text-center py-10">
        <h1 className="text-3xl font-bold mb-6">Hyperlane Contracts Info</h1>
      </div>
      <div className="flex justify-center gap-8 flex-wrap px-8">
        {/* Card for Anvil Chain 1 */}
        <div className="card bg-base-100 shadow-xl w-96 p-6 rounded-3xl break-words">
          <h3 className="text-lg font-bold mb-4">Anvil Chain-1</h3>
          <p>
            <strong>Owner:</strong>{" "}
            {isLoadingOwnerAnvil1 ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              <span className="text-primary">{ownerAnvil1?.toString()}</span>
            )}
          </p>
          <p className="mt-2">
            <strong>Mailbox:</strong>{" "}
            {isLoadingMailboxAnvil1 ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              <span className="text-primary">{mailboxAnvil1?.toString()}</span>
            )}
          </p>
          <p className="mt-2">
            <strong>Balance:</strong>{" "}
            {isLoadingBalanceAnvil1 ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              <span className="text-primary">{balanceAnvil1?.toString()}</span>
            )}
          </p>
        </div>
        {/* Card for Anvil Chain 2 */}
        <div className="card bg-base-100 shadow-xl w-96 p-6 rounded-3xl break-words">
          <h3 className="text-lg font-bold mb-4">Anvil Chain-2</h3>
          <p>
            <strong>Owner:</strong>{" "}
            {isLoadingOwnerAnvil2 ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              <span className="text-primary">{ownerAnvil2?.toString()}</span>
            )}
          </p>
          <p className="mt-2">
            <strong>Mailbox:</strong>{" "}
            {isLoadingMailboxAnvil2 ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              <span className="text-primary">{mailboxAnvil2?.toString()}</span>
            )}
          </p>
          <p className="mt-2">
            <strong>Balance:</strong>{" "}
            {isLoadingBalanceAnvil2 ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              <span className="text-primary">{balanceAnvil2?.toString()}</span>
            )}
          </p>
        </div>
      </div>

      {/* Mint Section */}
      <div className="flex gap-8 justify-center mt-10">
        {/* Mint on Chain 1 */}
        <div className="card bg-base-100 shadow-xl w-96 p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-4">Mint on Chain-1</h3>
          <button className="btn btn-primary" disabled={isMintingChain1} onClick={handleMintOnChain1}>
            {isMintingChain1 ? "Minting..." : "Mint 100 Tokens"}
          </button>
          {txHashChain1 && <p className="mt-2 text-green-600">Transaction Hash: {txHashChain1.toString()}</p>}
        </div>

        {/* Mint on Chain 2 */}
        <div className="card bg-base-100 shadow-xl w-96 p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-4">Mint on Chain-2</h3>
          <button className="btn btn-primary" disabled={isMintingChain2} onClick={handleMintOnChain2}>
            {isMintingChain2 ? "Minting..." : "Mint 100 Tokens"}
          </button>
          {txHashChain2 && <p className="mt-2 text-green-600">Transaction Hash: {txHashChain2.toString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
