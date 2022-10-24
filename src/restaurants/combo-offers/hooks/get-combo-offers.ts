import { useQuery } from "react-query";

import { ComboOffer } from "app/types/restaurant";
import axiosInstance from "axios-instance";

export const GetCombosQueryId = "get-combo-offers"

const getComboOffers = () =>
  axiosInstance.get<{ combos: ComboOffer[] }>("/foodcourt/combos");

const useGetComboOffers = () =>
  useQuery([GetCombosQueryId], () => getComboOffers());


export default useGetComboOffers;
