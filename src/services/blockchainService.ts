export type BlockchainListType = {
  id: number;
  value: string;
};

export const mockBCListService = (): BlockchainListType[] => {
  return mockBCList;
};

const mockBCList: BlockchainListType[] = [
  {
    id: 1,
    value: "bitcoin",
  },
  {
    id: 2,
    value: "ethereum",
  },
  {
    id: 3,
    value: "ripple",
  },
];
