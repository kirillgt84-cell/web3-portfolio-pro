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
      case "Real Estate": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Treasury": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Private Credit": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Real World Assets</h2>
        <p className="text-[#A0A0A0]">Tokenized traditional assets on blockchain</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#3B82F6] transition-all duration-300">
          <p className="text-[#A0A0A0] text-sm mb-2">Total RWA TVL</p>
          <p className="text-4xl font-bold">{formatCurrency(totalTVL)}</p>
        </div>
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#3B82F6] transition-all duration-300">
          <p className="text-[#A0A0A0] text-sm mb-2">Average APY</p>
          <p className="text-4xl font-bold text-[#3B82F6]">{averageAPY.toFixed(2)}%</p>
        </div>
      </div>

      {/* Assets List */}
      <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">Tokenized Assets</h3>
          <span className="px-4 py-2 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full text-sm font-medium border border-[#3B82F6]/20">
            RWA
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-[#A0A0A0]">Loading RWA data...</div>
        ) : (
          <div className="space-y-4">
            {assets.map((asset) => (
              <div 
                key={asset.id} 
                className="group bg-[#121212] rounded-xl p-6 border border-[#2A2A2A] hover:border-[#3B82F6] transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold">{asset.name}</h4>
                      <span className={"px-3 py-1 rounded-full text-xs border " + getTypeColor(asset.type)}>
                        {asset.type}
                      </span>
                    </div>
                    <p className="text-[#A0A0A0] text-sm">{asset.protocol} • {asset.chain}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-8 text-right">
                    <div>
                      <p className="text-[#A0A0A0] text-xs mb-1">APY</p>
                      <p className="text-xl font-bold text-green-400">{asset.apy}%</p>
                    </div>
                    <div>
                      <p className="text-[#A0A0A0] text-xs mb-1">TVL</p>
                      <p className="text-lg font-semibold">{formatCurrency(asset.tvl)}</p>
                    </div>
                    <div>
                      <p className="text-[#A0A0A0] text-xs mb-1">Price</p>
                      <p className="text-lg font-semibold">${asset.price.toFixed(2)}</p>
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
