import { describe, test, expect, afterEach } from "vitest";
import axios from "axios";

import MockAdapter from "axios-mock-adapter";
import { fetchCryptoPrice } from "../../../services/cryptoService";

const mockAxios = new MockAdapter(axios);

describe("fetchCryptoPrice", () => {
  const apiUrl = `${import.meta.env.VITE_COINGECKO_API_URL}/simple/price`;

  afterEach(() => {
    mockAxios.reset();
  });

  test("should return the crypto price for a valid cryptocurrency", async () => {
    const crypto = "bitcoin";
    const mockData = { bitcoin: { usd: 50000 } };
    mockAxios
      .onGet(`${apiUrl}?ids=${crypto}&vs_currencies=usd`)
      .reply(200, mockData);

    const price = await fetchCryptoPrice(crypto);
    expect(price).toBe(50000);
  });

  test("should return null if no cryptocurrency is provided", async () => {
    const price = await fetchCryptoPrice(undefined);
    expect(price).toBeNull();
  });

  test("should return null and log error when the API request fails", async () => {
    const crypto = "ethereum";
    mockAxios.onGet(`${apiUrl}?ids=${crypto}&vs_currencies=usd`).networkError();

    const price = await fetchCryptoPrice(crypto);
    expect(price).toBeNull();
  });

  test("should return null if cryptocurrency does not exist in the API response", async () => {
    const crypto = "invalidcrypto";
    const mockData = {};
    mockAxios
      .onGet(`${apiUrl}?ids=${crypto}&vs_currencies=usd`)
      .reply(200, mockData);

    const price = await fetchCryptoPrice(crypto);
    expect(price).toBeNull();
  });
});
