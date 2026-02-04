import { useAccount, useConnect, useDisconnect } from "wagmi";
import "./App.css";

function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Web3 Portfolio Dashboard
        </h1>

        {!isConnected ? (
          <div className="space-y-4">
            <p className="text-gray-400 mb-6">Connect your wallet to view portfolio</p>
            <button
              onClick={() => connect({ connector: connectors[0] })}
              disabled={isPending}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all disabled:opacity-50"
            >
              {isPending ? "Connecting..." : "Connect MetaMask"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <p className="text-gray-400 text-sm mb-2">Connected Wallet</p>
              <p className="text-xl font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
            <button
              onClick={() => disconnect()}
              className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;