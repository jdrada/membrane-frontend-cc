import { useQuery } from "@tanstack/react-query";
import { fetchCryptoPrice } from "../services/cryptoService";

type CryptoPriceType = number | null;

export const CryptoPrice = (crypto: string | undefined) => {
  const { isLoading, error, data } = useQuery<CryptoPriceType>({
    queryKey: ["cryptoPrice", crypto ?? "default"],
    queryFn: async (): Promise<CryptoPriceType> => {
      if (!crypto) {
        throw new Error("No cryptocurrency selected");
      }
      const price = await fetchCryptoPrice(crypto);
      return price;
    },
    enabled: !!crypto,
    /* Saving the price to a store is overkill, so we'll just stale and refetch every 5 minutes.
    I'd only do it if I foresee needing real-time updates or reusable price data across the app 
    -Juan */
    staleTime: 1000 * 60 * 5,
  });

  return {
    isLoading,
    error: error ? (error as Error).message : null,
    price: data ?? 0,
  };
};
