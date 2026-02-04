import { useAccount, useConnect, useDisconnect } from "wagmi";
import { DeFiDashboard } from "./components/DeFiDashboard";
import "./App.css";

function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Web3 Portfolio Dashboard
          </h1>
          
          {isConnected && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all text-sm border border-red-500/30"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {!isConnected ? (
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold mb-4">DeFi Portfolio Tracker</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Connect your wallet to view Aave positions, collateral ratios, and health factors in real-time.
              </p>
              <button
                onClick={() => connect({ connector: connectors[0] })}
                disabled={isPending}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all disabled:opacity-50 shadow-lg shadow-blue-600/25"
              >
                {isPending ? "Connecting..." : "Connect MetaMask"}
              </button>
            </div>
          </div>
        ) : (
          <DeFiDashboard />
        )}
      </main>
    </div>
  );
}

export default App;