import { useMutation } from "react-query";

import { ComboOffer } from "app/types/restaurant";
import axiosInstance from "axios-instance";
import { ComboOffersFormValue } from "restaurants/combo-offers/components/combo-offers-form";
import mapComboFormValuesToRequestData from "restaurants/combo-offers/services/map-combo-form-values-to-request-data";

export type ComboRequestType = {
  comboName: string;
  comboImageUrl: string;
  comboDescription: string;
  price: number;
  // bestSeller: boolean;
  comboCategories: {
    comboCategoryName: string;
    items: {
      restaurantId: string;
      dishId: string;
      dishVariantId: string;
    }[];
  }[];
};

const createComboOffer = (data: ComboRequestType) =>
  axiosInstance.post<ComboOffer>(`/foodcourt/combos`, { ...data });

const useCreateComboOffer = () => {
  const { mutate, isLoading } = useMutation(createComboOffer);

  const create = (v: ComboOffersFormValue) => {
    mutate(mapComboFormValuesToRequestData(v));
  };

  return { create, isLoading };
};

export default useCreateComboOffer;
