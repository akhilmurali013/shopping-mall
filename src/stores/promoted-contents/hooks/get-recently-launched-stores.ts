import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

export const GetRecentlyLaunchedStoresQueryId = "get-recently-stores";

type RecentStores = {
  id: string;
  name: string;
  brandLogoUrl: string;
  storeImageUrl: string;
  location: {
    floorId: number;
    name: string;
  };
};

const getRecentlyLaunchedStores = () =>
  axiosInstance.get<{
    stores: RecentStores[];
  }>("/promoted-content/recently-launched-stores");

const useGetRecentlyLaunchedStores = () =>
  useQuery([GetRecentlyLaunchedStoresQueryId], getRecentlyLaunchedStores);

export default useGetRecentlyLaunchedStores;
