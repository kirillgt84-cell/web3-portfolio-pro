import { useState, useEffect } from "react";

export interface RWAAsset {
  id: string;
  name: string;
  symbol: string;
  type: "Real Estate" | "Private Credit" | "Treasury" | "Commodities";
  apy: number;
  tvl: number;
  price: number;
  protocol: string;
  chain: string;
}

const MOCK_RWA_DATA: RWAAsset[] = [
  {
    id: "1",
    name: "New Silver",
    symbol: "NS-DROP",
    type: "Real Estate",
    apy: 8.5,
    tvl: 45000000,
    price: 1.02,
    protocol: "Centrifuge",
    chain: "Ethereum"
  },
  {
    id: "2",
    name: "Maple Cash Management",
    symbol: "MPL-CM",
    type: "Treasury",
    apy: 5.2,
    tvl: 120000000,
    price: 1.00,
    protocol: "Maple Finance",
    chain: "Ethereum"
  },
  {
    id: "3",
    name: "BlockTower Credit",
    symbol: "BTC-DROP",
    type: "Private Credit",
    apy: 12.8,
    tvl: 28000000,
    price: 1.05,
    protocol: "Centrifuge",
    chain: "Ethereum"
  },
  {
    id: "4",
    name: "Backed IB01",
    symbol: "bIB01",
    type: "Treasury",
    apy: 4.8,
    tvl: 85000000,
    price: 1.01,
    protocol: "Backed Finance",
    chain: "Ethereum"
  }
];

export function useRWAData() {
  const [data, setData] = useState<RWAAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(MOCK_RWA_DATA);
      setIsLoading(false);
    }, 1000);
  }, []);

  const totalTVL = data.reduce((acc, asset) => acc + asset.tvl, 0);
  const averageAPY = data.length > 0 ? data.reduce((acc, asset) => acc + asset.apy, 0) / data.length : 0;

  return { assets: data, isLoading, totalTVL, averageAPY };
}
