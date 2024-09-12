import { useQuery } from "@tanstack/react-query";
import { fetchCryptoPrice } from "../services/cryptoService";
import { useCryptoStore } from "../store/useCryptoStore";

export const CryptoPrice = (crypto: string | undefined) => {
  const setPrice = useCryptoStore((state) => state.setPrice);

  const { isPending, error, data } = useQuery({
    queryKey: ["cryptoPrice", crypto],
    queryFn: async () => {
      if (!crypto) {
        return null;
      }
      const price = await fetchCryptoPrice(crypto);
      setPrice(crypto, price ?? 0);
      return price;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    isPending,
    error,
    price: data,
  };
};
