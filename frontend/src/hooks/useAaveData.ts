import { useReadContract } from "wagmi";
import { formatUnits } from "viem";

const AAVE_POOL_V3 = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2";

const AAVE_POOL_ABI = [
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserAccountData",
    outputs: [
      { internalType: "uint256", name: "totalCollateralBase", type: "uint256" },
      { internalType: "uint256", name: "totalDebtBase", type: "uint256" },
      { internalType: "uint256", name: "availableBorrowsBase", type: "uint256" },
      { internalType: "uint256", name: "currentLiquidationThreshold", type: "uint256" },
      { internalType: "uint256", name: "ltv", type: "uint256" },
      { internalType: "uint256", name: "healthFactor", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function useAaveData(address: `0x${string}` | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: AAVE_POOL_V3,
    abi: AAVE_POOL_ABI,
    functionName: "getUserAccountData",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  if (!data) return { data: null, isLoading, error };

  return {
    data: {
      totalCollateralUSD: Number(formatUnits(data[0], 8)).toFixed(2),
      totalDebtUSD: Number(formatUnits(data[1], 8)).toFixed(2),
      availableBorrowsUSD: Number(formatUnits(data[2], 8)).toFixed(2),
      liquidationThreshold: Number(data[3]) / 100,
      ltv: Number(data[4]) / 100,
      healthFactor: Number(formatUnits(data[5], 18)).toFixed(2),
    },
    isLoading,
    error,
  };
}