import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { DeFiDashboard } from "./components/DeFiDashboard";
import { RWADashboard } from "./components/RWADashboard";
import { StrategyBuilder } from "./components/StrategyBuilder";
import { NLPInput } from "./components/NLPInput";
import "./App.css";

type Tab = "defi" | "rwa" | "strategies" | "nlp";

function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [activeTab, setActiveTab] = useState<Tab>("defi");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { id: "defi" as Tab, label: "DeFi", description: "Aave positions" },
    { id: "rwa" as Tab, label: "RWA", description: "Real world assets" },
    { id: "strategies" as Tab, label: "Strategies", description: "Portfolio allocation" },
    { id: "nlp" as Tab, label: "AI", description: "Natural language" },
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden">
        {/* Header */}
        <header 
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-[#121212]/80 backdrop-blur-[10px] border-b border-[#2A2A2A]" : "bg-transparent"
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
            <div className="text-xl font-bold tracking-tight">Web3 Portfolio</div>
            <nav className="hidden md:flex gap-8 text-[#A0A0A0] text-sm">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
          <div className="max-w-[800px] mx-auto text-center animate-fade-in">
            <h1 
              className="text-5xl md:text-7xl font-bold tracking-[-0.02em] leading-[1.1] mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              Simplicity is the<br />
              ultimate sophistication.
            </h1>
            <p className="text-[#A0A0A0] text-lg md:text-xl max-w-[600px] mx-auto mb-10 leading-relaxed">
              Strip away the non-essential to reveal the core of your DeFi portfolio. 
              Track, analyze, and optimize with precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => connect({ connector: connectors[0] })}
                disabled={isPending}
                className="px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Connecting..." : "Connect MetaMask"}
              </button>
              <a 
                href="#features" 
                className="px-8 py-4 border border-[#2A2A2A] hover:border-[#3B82F6] text-white font-medium rounded-full transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-[120px] px-6 bg-[#0a0a0a]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-20 animate-fade-in">
              <p className="text-[#3B82F6] text-sm font-medium uppercase tracking-wider mb-4">Our Philosophy</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Essentialism in Design</h2>
              <p className="text-[#A0A0A0] max-w-[600px] mx-auto">
                We believe that by removing the unnecessary, the necessary may speak. 
                Our process is one of reduction, focusing purely on impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  title: "Focus",
                  desc: "Eliminating visual noise to highlight exactly what matters most to your portfolio."
                },
                {
                  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 21v-1",
                  title: "Clarity",
                  desc: "Communicating your portfolio status with absolute precision, intent, and zero ambiguity."
                },
                {
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Purpose",
                  desc: "Ensuring every single design element serves a distinct and valuable function."
                }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="group bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#3B82F6] transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center mb-6 text-[#3B82F6]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-[120px] px-6 text-center">
          <div className="max-w-[600px] mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Let's create something timeless.
            </h2>
            <p className="text-[#A0A0A0] mb-10">
              Ready to strip away the noise? Connect your wallet to discuss your next portfolio strategy.
            </p>
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#2A2A2A] py-8 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[#A0A0A0] text-sm">
            <p>© 2024 Web3 Portfolio. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Connected Dashboard View
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-[#2A2A2A] bg-[#121212]/80 backdrop-blur-[10px]`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">Web3 Portfolio</div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-1 bg-[#1E1E1E] rounded-full p-1 border border-[#2A2A2A]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? "bg-[#3B82F6] text-white" 
                      : "text-[#A0A0A0] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center gap-3 pl-6 border-l border-[#2A2A2A]">
              <span className="text-[#A0A0A0] text-sm">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors"
                title="Disconnect"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tab Bar */}
      <div className="md:hidden fixed top-20 left-0 w-full bg-[#121212]/95 backdrop-blur-[10px] border-b border-[#2A2A2A] z-40">
        <div className="flex overflow-x-auto p-2 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? "bg-[#3B82F6] text-white" 
                  : "bg-[#1E1E1E] text-[#A0A0A0] border border-[#2A2A2A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto animate-fade-in">
          {activeTab === "defi" && <DeFiDashboard />}
          {activeTab === "rwa" && <RWADashboard />}
          {activeTab === "strategies" && <StrategyBuilder />}
          {activeTab === "nlp" && <NLPInput />}
        </div>
      </main>
    </div>
  );
}

export default App;
