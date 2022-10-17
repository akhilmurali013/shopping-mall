import { useQuery } from "react-query";

import { BankAccount } from "app/types";
import axiosInstance from "axios-instance";

const getBankDetails = (storeId?: string) =>
  axiosInstance.get<BankAccount>(`/stores/${storeId}/account-details`);

const useGetBankDetails = (storeId?: string) =>
  useQuery(["get-store-bank-details", storeId], () => getBankDetails(storeId), {
    enabled: !!storeId,
  });

export default useGetBankDetails;
