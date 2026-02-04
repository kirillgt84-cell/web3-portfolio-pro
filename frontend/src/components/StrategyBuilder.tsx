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

  const expectedApy = (eth * 0.05 + aave * 0.08 + rwa * 0.07) / 100;
  const riskLevel = eth > 50 ? "High" : rwa > 50 ? "Low" : "Medium";

  const handleSave = () => {
    if (!isValid || !name) return;
    saveStrategy({ name, allocation: { eth, aave, rwa }, expectedApy, riskLevel });
    setName("");
    setEth(30);
    setAave(40);
    setRwa(30);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Create Strategy</h2>
        
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Strategy name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800/30 rounded-2xl p-4 border border-white/5">
            <label className="text-gray-400 text-sm">ETH %</label>
            <input type="number" value={eth} onChange={(e) => setEth(Number(e.target.value))} className="w-full mt-2 px-3 py-2 bg-slate-700/50 rounded-lg text-white" />
          </div>
          <div className="bg-slate-800/30 rounded-2xl p-4 border border-white/5">
            <label className="text-gray-400 text-sm">Aave %</label>
            <input type="number" value={aave} onChange={(e) => setAave(Number(e.target.value))} className="w-full mt-2 px-3 py-2 bg-slate-700/50 rounded-lg text-white" />
          </div>
          <div className="bg-slate-800/30 rounded-2xl p-4 border border-white/5">
            <label className="text-gray-400 text-sm">RWA %</label>
            <input type="number" value={rwa} onChange={(e) => setRwa(Number(e.target.value))} className="w-full mt-2 px-3 py-2 bg-slate-700/50 rounded-lg text-white" />
          </div>
        </div>

        <div className={"text-center mb-6 " + (isValid ? "text-green-400" : "text-red-400")}>
          Total: {total}% {isValid ? "✓" : "(must be 100%)"}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm">Expected APY</p>
            <p className="text-3xl font-bold text-white">{expectedApy.toFixed(2)}%</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm">Risk Level</p>
            <p className="text-3xl font-bold text-white">{riskLevel}</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!isValid || !name}
          className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium transition-all"
        >
          Save Strategy
        </button>
      </div>

      {strategies.length > 0 && (
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Saved Strategies</h3>
          <div className="space-y-3">
            {strategies.map((s) => (
              <div key={s.id} className="flex items-center justify-between bg-slate-800/30 rounded-xl p-4 border border-white/5">
                <div>
                  <p className="font-bold text-white">{s.name}</p>
                  <p className="text-sm text-gray-400">ETH:{s.allocation.eth}% Aave:{s.allocation.aave}% RWA:{s.allocation.rwa}%</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{s.expectedApy.toFixed(2)}% APY</p>
                    <p className="text-xs text-gray-500">{s.riskLevel} Risk</p>
                  </div>
                  <button onClick={() => deleteStrategy(s.id)} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm hover:bg-red-500/30">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
