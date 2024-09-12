import { useQuery } from "@tanstack/react-query";
import { fetchCryptoPrice } from "../services/cryptoService";

export const CryptoPrice = (crypto: string | undefined) => {
  // const setPrice = useCryptoStore((state) => state.setPrice);

  const { isPending, error, data } = useQuery({
    queryKey: ["cryptoPrice", crypto],
    queryFn: async () => {
      return await fetchCryptoPrice(crypto);
    },
  });

  return {
    isPending,
    error,
    price: data,
  };
};
