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
      
      if (lower.includes("консервативн") || lower.includes("safe") || lower.includes("low risk") || lower.includes("stable")) {
        eth = 20; aave = 30; rwa = 50; risk = "Low";
      } else if (lower.includes("агрессивн") || lower.includes("aggressive") || lower.includes("high risk") || lower.includes("growth")) {
        eth = 60; aave = 20; rwa = 20; risk = "High";
      }
      
      if (lower.includes("много eth") || lower.includes("heavy eth") || lower.includes("more eth")) eth += 20;
      if (lower.includes("только aave") || lower.includes("only aave")) { eth = 0; rwa = 0; aave = 100; }
      
      setResult({ eth, aave, rwa, risk, reasoning: "Based on keywords detected in your description" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">AI Strategy Parser</h2>
        <p className="text-[#A0A0A0]">Describe your investment strategy in natural language</p>
      </div>

      <div className="max-w-[800px] mx-auto">
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: I want a conservative strategy with low risk and steady income from real estate..."
            className="w-full h-32 px-4 py-3 bg-[#121212] border border-[#2A2A2A] rounded-xl text-white placeholder-[#666] focus:outline-none focus:border-[#3B82F6] resize-none mb-6"
          />
          
          <button
            onClick={handleParse}
            disabled={!text || loading}
            className="w-full py-4 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            {loading ? "Analyzing..." : "Parse Strategy"}
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-[#1E1E1E] border border-[#3B82F6]/30 rounded-2xl p-8 animate-fade-in">
            <h3 className="text-xl font-bold mb-6">Parsed Strategy</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#121212] rounded-xl p-6 text-center border border-[#2A2A2A]">
                <p className="text-[#A0A0A0] text-sm mb-2">ETH</p>
                <p className="text-3xl font-bold">{result.eth}%</p>
              </div>
              <div className="bg-[#121212] rounded-xl p-6 text-center border border-[#2A2A2A]">
                <p className="text-[#A0A0A0] text-sm mb-2">Aave</p>
                <p className="text-3xl font-bold">{result.aave}%</p>
              </div>
              <div className="bg-[#121212] rounded-xl p-6 text-center border border-[#2A2A2A]">
                <p className="text-[#A0A0A0] text-sm mb-2">RWA</p>
                <p className="text-3xl font-bold">{result.rwa}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#121212] rounded-xl p-4 border border-[#2A2A2A]">
              <span className="text-[#A0A0A0]">Risk Assessment:</span>
              <span className={`font-bold text-lg ${
                result.risk === "Low" ? "text-green-400" : result.risk === "High" ? "text-red-400" : "text-yellow-400"
              }`}>
                {result.risk} Risk
              </span>
            </div>
            
            <p className="mt-4 text-sm text-[#A0A0A0] italic">{result.reasoning}</p>
          </div>
        )}
      </div>
    </div>
  );
}
