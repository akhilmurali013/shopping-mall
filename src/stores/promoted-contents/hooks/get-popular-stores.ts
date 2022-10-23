import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

export const GetPopularStoresQueryId = "get-popular-stores";

type PopularStores = {
  id: string;
  name: string;
  brandLogoUrl: string;
  storeImageUrl: string;
  location: {
    floorId: number;
    name: string;
  };
};

const getPopularStores = () =>
  axiosInstance.get<{
    stores: PopularStores[];
  }>("/promoted-content/popular-stores");

const useGetPopularStores = () =>
  useQuery([GetPopularStoresQueryId], getPopularStores);

export default useGetPopularStores;
