import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { useAaveData } from "../hooks/useAaveData";

export function DeFiDashboard() {
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  const { data: aaveData, isLoading: aaveLoading } = useAaveData(address);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Wallet Overview */}
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-white">Wallet Balance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Native ETH</p>
            <p className="text-3xl font-bold text-white">
              {ethBalance?.value ? Number(formatUnits(ethBalance.value, ethBalance.decimals)).toFixed(4) : "0.0000"} ETH
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Network</p>
            <p className="text-2xl font-bold text-white">Ethereum</p>
            <p className="text-xs text-gray-500 mt-1">Mainnet</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Wallet Status</p>
            <p className="text-xl font-bold text-green-400">Active</p>
            <p className="text-xs text-gray-500 mt-1 truncate">{address}</p>
          </div>
        </div>
      </div>

      {/* Aave Section */}
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Aave v3 Positions</h2>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
            DeFi
          </span>
        </div>

        {aaveLoading ? (
          <div className="text-center py-8 text-gray-400">Loading Aave data...</div>
        ) : aaveData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
              <p className="text-gray-400 text-sm mb-2">Total Collateral</p>
              <p className="text-2xl font-bold text-green-400">${aaveData.totalCollateralUSD}</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
              <p className="text-gray-400 text-sm mb-2">Total Debt</p>
              <p className="text-2xl font-bold text-red-400">${aaveData.totalDebtUSD}</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
              <p className="text-gray-400 text-sm mb-2">Available to Borrow</p>
              <p className="text-2xl font-bold text-blue-400">${aaveData.availableBorrowsUSD}</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
              <p className="text-gray-400 text-sm mb-2">Health Factor</p>
              <p className={`text-2xl font-bold ${
                Number(aaveData.healthFactor) > 1.5 
                  ? "text-green-400" 
                  : Number(aaveData.healthFactor) > 1.1 
                  ? "text-yellow-400" 
                  : "text-red-400"
              }`}>
                {aaveData.healthFactor}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Number(aaveData.healthFactor) > 1.5 ? "Safe" : "Risky"}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No Aave position found or error loading data
          </div>
        )}

        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5">
          <p className="text-sm text-gray-400">
            <span className="text-purple-400 font-semibold">Note:</span> Data fetched directly from Aave Pool contract. 
            Health Factor &gt; 1.5 is considered safe. If &lt; 1.0, position can be liquidated.
          </p>
        </div>
      </div>
    </div>
  );
}