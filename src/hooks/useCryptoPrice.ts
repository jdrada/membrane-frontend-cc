import { useQuery } from "@tanstack/react-query";
import { fetchCryptoPrice } from "../services/cryptoService";
import { useCryptoStore } from "../store/useCryptoStore";

type CryptoPriceType = number | null;

export const CryptoPrice = (crypto: string | undefined) => {
  const setPrice = useCryptoStore((state) => state.setPrice);

  const { isLoading, error, data } = useQuery<CryptoPriceType>({
    queryKey: ["cryptoPrice", crypto ?? "default"],
    queryFn: async (): Promise<CryptoPriceType> => {
      if (!crypto) {
        throw new Error("No cryptocurrency selected");
      }
      const price = await fetchCryptoPrice(crypto);
      setPrice(crypto, price ?? 0);
      return price;
    },
    enabled: !!crypto,
    staleTime: 1000 * 60 * 5,
  });

  return {
    isLoading,
    error: error ? (error as Error).message : null,
    price: data ?? 0,
  };
};
