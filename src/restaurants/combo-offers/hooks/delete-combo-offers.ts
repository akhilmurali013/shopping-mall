import { useMutation, useQueryClient } from "react-query";

import { ComboOffer } from "app/types/restaurant";
import axiosInstance from "axios-instance";

import { GetCombosQueryId } from "./get-combo-offers";

const removeCombo = (comboId: string) =>
  axiosInstance.delete<ComboOffer>(`/foodcourt/combos/${comboId}`);

const useDeleteCombo = () => {
  const queryClient = useQueryClient();
  return useMutation(removeCombo, {
    onSuccess: () => {
      queryClient.refetchQueries(GetCombosQueryId);
    },
  });
};

export default useDeleteCombo;
