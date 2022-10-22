import { useQuery } from "react-query";

import { StoreCatagories } from "app/types/store";
import axiosInstance from "axios-instance";
import { StoreFilterType } from "stores/store-records/pages/store-list";

export const GetStoresQueryId = "get-stores";

type StoreListFetchType = {
  count: number;
  total: number;
  _embedded: {
    stores: {
      storeId: string;
      name: string;
      ownerName: string;
      location: {
        floorId: string;
        name: string;
      };
      categories: StoreCatagories[];
      brandLogo: string;
      storeImage: string;
      storeTimings: {
        openingTime: string;
        closingTime: string;
      };
      links: {
        rel: string;
        href: string;
      }[];
    }[];
  };
};

const getStores = (filters?: StoreFilterType) =>
  axiosInstance.post<StoreListFetchType>("/stores/_query", {
    query: filters?.query ? filters.query : undefined,
    storeCategories: filters?.category ? [filters.category] : undefined,
  });

const useGetStores = (filters?: StoreFilterType) =>
  useQuery([GetStoresQueryId, filters], () => getStores(filters));

export default useGetStores;
