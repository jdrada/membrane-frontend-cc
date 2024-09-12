import { mockBCListService } from "../services/blockchainService";

export const useGetBlockchains = () => {
  /* Challenge: "A dropdown menu to select a cryptocurrency from a predefined list" 
      Since we are not using a real API, we will use a mock service to get the list of blockchains.
      But for a real-world application, I would most likely fetch this data from an API.
      -Juan
      */

  return {
    blockchains: mockBCListService(),
  };
};
