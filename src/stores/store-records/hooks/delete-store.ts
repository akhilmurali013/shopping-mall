import { useMutation, useQueryClient } from "react-query";

import { Store } from "app/types/store";
import axiosInstance from "axios-instance";

import { GetStoresQueryId } from "./get-stores";

const removeStore = ({ id }: { id: string }): Promise<Store["storeId"]> =>
  axiosInstance.delete(`/stores/${id}`);

// update the code to clear the cache after delete
const useDeleteStore = () => {
  const queryClient = useQueryClient();
  return useMutation(removeStore, {
    onSuccess: () => {
      queryClient.refetchQueries(GetStoresQueryId);
    },
  });
};

export default useDeleteStore;
