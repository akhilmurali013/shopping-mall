import { useQuery } from "react-query";

import { ComboOffer } from "app/types/restaurant";
import axiosInstance from "axios-instance";

export const GetComboQueryId = "get-combo-offer";

const getComboOffer = (id?: string) =>
  axiosInstance.get<ComboOffer>(`/foodcourt/combos/${id}`);

const useGetComboOffer = (id?: string) =>
  useQuery([GetComboQueryId, id], () => getComboOffer(id), {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

export default useGetComboOffer;
