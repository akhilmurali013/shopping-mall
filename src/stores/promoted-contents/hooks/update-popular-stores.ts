import { useMutation, useQueryClient } from "react-query";

import axiosInstance from "axios-instance";

import { GetPopularStoresQueryId } from "./get-popular-stores";

type storeIdListType = { id: string };

const updatePopularStores = (storeIds: storeIdListType[]) =>
  axiosInstance.put<{
    stores: {
      id: string;
      name: string;
      brandLogoUrl: string;
      storeImageUrl: string;
      location: {
        floorId: number;
        name: string;
      };
    }[];
  }>("/promoted-content/popular-stores", { stores: storeIds });

const useUpdatePopularStores = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePopularStores, {
    onSuccess: () => {
      queryClient.refetchQueries(GetPopularStoresQueryId);
    },
  });
};

export default useUpdatePopularStores;
