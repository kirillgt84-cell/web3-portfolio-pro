import { useState, useEffect } from "react";

export interface Strategy {
  id: string;
  name: string;
  allocation: {
    eth: number;
    aave: number;
    rwa: number;
  };
  expectedApy: number;
  riskLevel: "Low" | "Medium" | "High";
  createdAt: string;
}

export function useStrategies() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_strategies");
    if (saved) {
      setStrategies(JSON.parse(saved));
    }
  }, []);

  const saveStrategy = (strategy: Omit<Strategy, "id" | "createdAt">) => {
    const newStrategy: Strategy = {
      ...strategy,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...strategies, newStrategy];
    setStrategies(updated);
    localStorage.setItem("portfolio_strategies", JSON.stringify(updated));
    return newStrategy;
  };

  const deleteStrategy = (id: string) => {
    const updated = strategies.filter((s) => s.id !== id);
    setStrategies(updated);
    localStorage.setItem("portfolio_strategies", JSON.stringify(updated));
  };

  return { strategies, saveStrategy, deleteStrategy };
}
