import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { useAaveData } from "../hooks/useAaveData";

export function DeFiDashboard() {
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  const { data: aaveData, isLoading: aaveLoading } = useAaveData(address);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">DeFi Positions</h2>
        <p className="text-[#A0A0A0]">Real-time Aave v3 portfolio analytics</p>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#3B82F6] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#A0A0A0] text-sm">Native ETH</span>
            <div className="w-8 h-8 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center text-[#3B82F6]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold">
            {ethBalance?.value ? Number(formatUnits(ethBalance.value, ethBalance.decimals)).toFixed(4) : "0.0000"} ETH
          </p>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#3B82F6] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#A0A0A0] text-sm">Network</span>
            <div className="w-8 h-8 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center text-[#3B82F6]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold">Ethereum</p>
          <p className="text-[#A0A0A0] text-sm">Mainnet</p>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#3B82F6] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#A0A0A0] text-sm">Wallet Status</span>
            <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-green-400">Active</p>
          <p className="text-[#A0A0A0] text-sm truncate">{address}</p>
        </div>
      </div>

      {/* Aave Section */}
      <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Aave v3 Positions</h3>
            <p className="text-[#A0A0A0] text-sm">Decentralized lending protocol</p>
          </div>
          <span className="px-4 py-2 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full text-sm font-medium border border-[#3B82F6]/20">
            DeFi
          </span>
        </div>

        {aaveLoading ? (
          <div className="text-center py-12 text-[#A0A0A0]">Loading Aave data...</div>
        ) : aaveData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#121212] rounded-xl p-6 border border-[#2A2A2A]">
              <p className="text-[#A0A0A0] text-sm mb-2">Total Collateral</p>
              <p className="text-2xl font-bold text-green-400">${aaveData.totalCollateralUSD}</p>
            </div>
            
            <div className="bg-[#121212] rounded-xl p-6 border border-[#2A2A2A]">
              <p className="text-[#A0A0A0] text-sm mb-2">Total Debt</p>
              <p className="text-2xl font-bold text-red-400">${aaveData.totalDebtUSD}</p>
            </div>
            
            <div className="bg-[#121212] rounded-xl p-6 border border-[#2A2A2A]">
              <p className="text-[#A0A0A0] text-sm mb-2">Available Borrow</p>
              <p className="text-2xl font-bold text-[#3B82F6]">${aaveData.availableBorrowsUSD}</p>
            </div>
            
            <div className="bg-[#121212] rounded-xl p-6 border border-[#2A2A2A]">
              <p className="text-[#A0A0A0] text-sm mb-2">Health Factor</p>
              <p className={`text-2xl font-bold ${
                Number(aaveData.healthFactor) > 1.5 ? "text-green-400" : 
                Number(aaveData.healthFactor) > 1.1 ? "text-yellow-400" : "text-red-400"
              }`}>
                {aaveData.healthFactor}
              </p>
              <p className="text-xs text-[#A0A0A0] mt-1">
                {Number(aaveData.healthFactor) > 1.5 ? "Safe" : "Risky"}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-[#A0A0A0]">
            No Aave position found or error loading data
          </div>
        )}

        <div className="mt-6 p-4 bg-[#121212] rounded-xl border border-[#2A2A2A]">
          <p className="text-sm text-[#A0A0A0]">
            <span className="text-[#3B82F6] font-semibold">Note:</span> Data fetched directly from Aave Pool contract. 
            Health Factor &gt; 1.5 is considered safe. If &lt; 1.0, position can be liquidated.
          </p>
        </div>
      </div>
    </div>
  );
}
