import { useRWAData } from "../hooks/useRWAData";

export function RWADashboard() {
  const { assets, isLoading, totalTVL, averageAPY } = useRWAData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Real Estate": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Treasury": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Private Credit": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Total RWA TVL</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalTVL)}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Average APY</p>
          <p className="text-3xl font-bold text-white">{averageAPY.toFixed(2)}%</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Tokenized Real World Assets</h2>
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30">RWA</span>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-gray-400">Loading RWA data...</div>
        ) : (
          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.id} className="bg-slate-800/50 rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{asset.name}</h3>
                      <span className={"px-2 py-1 rounded-full text-xs border " + getTypeColor(asset.type)}>{asset.type}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{asset.protocol} • {asset.chain}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-right">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">APY</p>
                      <p className="text-xl font-bold text-green-400">{asset.apy}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">TVL</p>
                      <p className="text-lg font-semibold text-white">{formatCurrency(asset.tvl)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Price</p>
                      <p className="text-lg font-semibold text-white">${asset.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
