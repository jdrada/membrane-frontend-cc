import axios from "axios";

type CryptoPrice = number;

export const fetchCryptoPrice = async (
  crypto: string | undefined
): Promise<CryptoPrice | null> => {
  if (!crypto) {
    return null;
  }
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`
    );
    if (!response.data[crypto]) {
      throw new Error("Invalid cryptocurrency");
    }
    return response.data[crypto].usd;
  } catch (error) {
    console.error(error);
    return null;
  }
};
