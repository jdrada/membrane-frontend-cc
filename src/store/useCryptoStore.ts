import { create } from "zustand";

type CryptoState = {
  prices: Record<string, number>;
  setPrice: (crypto: string, price: number) => void;
};

export const useCryptoStore = create<CryptoState>((set) => ({
  prices: {},
  setPrice: (crypto, price) =>
    set((state) => ({
      prices: { ...state.prices, [crypto]: price },
    })),
}));
