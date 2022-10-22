import { useMutation, useQueryClient } from "react-query";

import axiosInstance from "axios-instance";

import { GetRecentlyLaunchedStoresQueryId } from "./get-recently-launched-stores";

type storeIdListType = { id: string };

const updateRecentStores = (storeIds: storeIdListType[]) =>
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
  }>("/promoted-content/recently-launched-stores", { stores: storeIds });

const useUpdateRecentlyLaunchedStores = () => {
  const queryClient = useQueryClient();
  return useMutation(updateRecentStores, {
    onSuccess: () => {
      queryClient.refetchQueries(GetRecentlyLaunchedStoresQueryId);
    },
  });
};

export default useUpdateRecentlyLaunchedStores;
