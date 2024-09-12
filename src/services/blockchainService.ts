import { BlockchainType } from "../types/types";

export const mockBCListService = (): BlockchainType[] => {
  return mockBCList;
};

const mockBCList: BlockchainType[] = [
  {
    id: 1,
    name: "bitcoin",
    symbol: "BTC",
  },
  {
    id: 2,
    name: "ethereum",
    symbol: "ETH",
  },
  {
    id: 3,
    name: "ripple",
    symbol: "XRP",
  },
];
