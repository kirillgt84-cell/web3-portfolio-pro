import { useState } from "react";

interface ParsedStrategy {
  eth: number;
  aave: number;
  rwa: number;
  risk: string;
  reasoning: string;
}

export function NLPInput() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ParsedStrategy | null>(null);

  const handleParse = async () => {
    setLoading(true);
    setTimeout(() => {
      const lower = text.toLowerCase();
      let eth = 33, aave = 33, rwa = 34, risk = "Medium";
      
      if (lower.includes("консервативн") || lower.includes("safe") || lower.includes("low risk")) {
        eth = 20; aave = 30; rwa = 50; risk = "Low";
      } else if (lower.includes("агрессивн") || lower.includes("aggressive") || lower.includes("high risk")) {
        eth = 60; aave = 20; rwa = 20; risk = "High";
      } else if (lower.includes("сбалансир") || lower.includes("balanced")) {
        eth = 33; aave = 33; rwa = 34; risk = "Medium";
      }
      
      if (lower.includes("много eth") || lower.includes("heavy eth")) eth += 20;
      if (lower.includes("только aave") || lower.includes("only aave")) { eth = 0; rwa = 0; aave = 100; }
      
      setResult({
        eth,
        aave,
        rwa,
        risk,
        reasoning: "Based on keywords detected in your description"
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">AI Strategy Parser</h2>
        <p className="text-gray-400 mb-6">Describe your investment strategy in natural language</p>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: I want a conservative strategy with low risk and steady income from real estate..."
          className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none mb-4"
        />
        
        <button
          onClick={handleParse}
          disabled={!text || loading}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl font-medium transition-all"
        >
          {loading ? "Analyzing..." : "Parse Strategy"}
        </button>
      </div>

      {result && (
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Parsed Strategy</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <p className="text-gray-400 text-sm">ETH</p>
              <p className="text-2xl font-bold text-white">{result.eth}%</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <p className="text-gray-400 text-sm">Aave</p>
              <p className="text-2xl font-bold text-white">{result.aave}%</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <p className="text-gray-400 text-sm">RWA</p>
              <p className="text-2xl font-bold text-white">{result.rwa}%</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-slate-800/30 rounded-xl p-4">
            <span className="text-gray-400">Risk Level:</span>
            <span className={"font-bold " + (result.risk === "Low" ? "text-green-400" : result.risk === "High" ? "text-red-400" : "text-yellow-400")}>{result.risk}</span>
          </div>
          <p className="mt-4 text-sm text-gray-400 italic">{result.reasoning}</p>
        </div>
      )}
    </div>
  );
}
