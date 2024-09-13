import { BlockchainType, DirectionEnum, OrderDataType } from "../types/types";

export const mockBCList: BlockchainType[] = [
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

export const mockInitialData: OrderDataType = {
  id: "1",
  cryptocurrency: "bitcoin",
  direction: DirectionEnum.BUY,
  quantity: 0,
  expirationDate: "",
  usdValue: 0,
};
