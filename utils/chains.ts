import { Chain } from "@wagmi/core";

export const ZKATANA = {
  id: 1261120,
  name: "zKatana",
  network: "zKatana",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc.startale.com/zkatana"] },
    default: { http: ["https://rpc.startale.com/zkatana"] },
  },
  blockExplorers: {
    default: {
      name: "Startlale",
      url: "https://zkatana.blockscout.com",
    },
  },
} as Chain;
