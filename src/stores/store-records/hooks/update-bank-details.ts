import { useMutation } from "react-query";

import { BankDetails } from "app/types/store";
import axiosInstance from "axios-instance";

const updateBankDetails = ({
  storeId,
  accountNumber,
  accountName,
  upiId,
}: {
  storeId: string;
  accountNumber: string;
  accountName: string;
  upiId: string;
}) =>
  axiosInstance.post<BankDetails>(`/stores/${storeId}/account-details`, {
    accountNumber,
    accountName,
    upiId,
  });

const useBankDetailsUpdate = () => useMutation(updateBankDetails);

export default useBankDetailsUpdate;
