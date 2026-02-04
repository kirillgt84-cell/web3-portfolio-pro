import { useState } from "react";
import { useStrategies } from "../hooks/useStrategies";

export function StrategyBuilder() {
  const { strategies, saveStrategy, deleteStrategy } = useStrategies();
  const [name, setName] = useState("");
  const [eth, setEth] = useState(30);
  const [aave, setAave] = useState(40);
  const [rwa, setRwa] = useState(30);

  const total = eth + aave + rwa;
  const isValid = total === 100;

  const expectedApy = (eth * 0.05 + aave * 0.08 + rwa * 0.075) / 100;
  
  const getRiskLevel = () => {
    if (eth > 50) return { level: "High", color: "text-red-400" };
    if (rwa > 50) return { level: "Low", color: "text-green-400" };
    return { level: "Medium", color: "text-yellow-400" };
  };
  
  const risk = getRiskLevel();

  const handleSave = () => {
    if (!isValid || !name) return;
    saveStrategy({ 
      name, 
      allocation: { eth, aave, rwa }, 
      expectedApy, 
      riskLevel: risk.level as "Low" | "Medium" | "High"
    });
    setName("");
    setEth(30);
    setAave(40);
    setRwa(30);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Strategy Builder</h2>
        <p className="text-[#A0A0A0]">Create and optimize your portfolio allocation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Builder Form */}
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">New Strategy</h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-[#A0A0A0] text-sm mb-2 block">Strategy Name</label>
              <input
                type="text"
                placeholder="e.g., Conservative Growth"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#121212] border border-[#2A2A2A] rounded-xl text-white placeholder-[#666] focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>

            <div className="space-y-4">
              <div className="bg-[#121212] rounded-xl p-4 border border-[#2A2A2A]">
                <div className="flex justify-between mb-2">
                  <label className="text-sm">ETH Allocation</label>
                  <span className="font-bold">{eth}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={eth} 
                  onChange={(e) => setEth(Number(e.target.value))}
                  className="w-full h-2 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                />
              </div>

              <div className="bg-[#121212] rounded-xl p-4 border border-[#2A2A2A]">
                <div className="flex justify-between mb-2">
                  <label className="text-sm">Aave Allocation</label>
                  <span className="font-bold">{aave}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={aave} 
                  onChange={(e) => setAave(Number(e.target.value))}
                  className="w-full h-2 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                />
              </div>

              <div className="bg-[#121212] rounded-xl p-4 border border-[#2A2A2A]">
                <div className="flex justify-between mb-2">
                  <label className="text-sm">RWA Allocation</label>
                  <span className="font-bold">{rwa}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={rwa} 
                  onChange={(e) => setRwa(Number(e.target.value))}
                  className="w-full h-2 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                />
              </div>
            </div>

            <div className={`text-center py-3 rounded-lg ${isValid ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
              Total: {total}% {isValid ? "✓" : "(must be 100%)"}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#121212] rounded-xl p-4 text-center border border-[#2A2A2A]">
                <p className="text-[#A0A0A0] text-xs mb-1">Expected APY</p>
                <p className="text-2xl font-bold text-[#3B82F6]">{expectedApy.toFixed(2)}%</p>
              </div>
              <div className="bg-[#121212] rounded-xl p-4 text-center border border-[#2A2A2A]">
                <p className="text-[#A0A0A0] text-xs mb-1">Risk Level</p>
                <p className={`text-2xl font-bold ${risk.color}`}>{risk.level}</p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={!isValid || !name}
              className="w-full py-4 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Save Strategy
            </button>
          </div>
        </div>

        {/* Saved Strategies */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">Saved Strategies</h3>
          {strategies.length === 0 ? (
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-12 text-center text-[#A0A0A0]">
              No strategies saved yet. Create your first strategy.
            </div>
          ) : (
            strategies.map((s) => (
              <div key={s.id} className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#3B82F6] transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{s.name}</h4>
                    <p className="text-[#A0A0A0] text-sm">
                      ETH: {s.allocation.eth}% • Aave: {s.allocation.aave}% • RWA: {s.allocation.rwa}%
                    </p>
                  </div>
                  <button 
                    onClick={() => deleteStrategy(s.id)}
                    className="p-2 hover:bg-red-500/10 text-[#A0A0A0] hover:text-red-400 rounded-lg transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
                <div className="flex gap-4">
                  <div className="bg-[#121212] rounded-lg px-4 py-2">
                    <span className="text-[#A0A0A0] text-xs">APY: </span>
                    <span className="text-[#3B82F6] font-bold">{s.expectedApy.toFixed(2)}%</span>
                  </div>
                  <div className="bg-[#121212] rounded-lg px-4 py-2">
                    <span className="text-[#A0A0A0] text-xs">Risk: </span>
                    <span className={s.riskLevel === "Low" ? "text-green-400" : s.riskLevel === "High" ? "text-red-400" : "text-yellow-400"}>
                      {s.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
