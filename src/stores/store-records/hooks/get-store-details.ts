import { useQuery } from "react-query";

import { Store } from "app/types/store";
import axiosInstance from "axios-instance";

const getStore = (storeId?: string) =>
  axiosInstance.get<Store>(`/stores/${storeId}`);

const useGetStoreDetails = (storeId?: string) =>
  useQuery(["get-store-details", storeId], () => getStore(storeId));

export default useGetStoreDetails;
