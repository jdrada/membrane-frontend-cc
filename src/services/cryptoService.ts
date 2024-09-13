/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

type CryptoPrice = number;

export const fetchCryptoPrice = async (
  crypto: string | undefined
): Promise<CryptoPrice | null> => {
  const url = `${import.meta.env.VITE_COINGECKO_API_URL}/simple/price?ids=${crypto}&vs_currencies=usd`;
  if (!crypto) {
    return null;
  }
  try {
    const response = await axios.get(url);
    if (!response.data[crypto]) {
      throw new Error("Invalid cryptocurrency");
    }
    return response.data[crypto].usd;
  } catch (error) {
    return null;
  }
};
