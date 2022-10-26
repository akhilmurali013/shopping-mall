import { useMutation } from "react-query";

import { AxiosResponse } from "axios";

import { ComboOffer } from "app/types/restaurant";
import axiosInstance from "axios-instance";
import { ComboOffersFormValue } from "restaurants/combo-offers/components/combo-offers-form";
import {
  useRouteToComboRoot,
  useUploadComboFile,
} from "restaurants/combo-offers/hooks";
import mapComboFormValuesToRequestData from "restaurants/combo-offers/services/map-combo-form-values-to-request-data";

export type ComboCreateRequestType = {
  comboName: string;
  comboDescription: string;
  price: number;
  bestSeller: boolean;
  comboCategories: {
    comboCategoryName: string;
    items: {
      restaurantId: string;
      dishId: string;
      dishVariantId: string;
    }[];
  }[];
};

const createComboOffer = (data: ComboCreateRequestType) =>
  axiosInstance.post<ComboOffer>(`/foodcourt/combos`, { ...data });

const useCreateComboOffer = () => {
  const routeToRestaurantRoot = useRouteToComboRoot();
  const { mutateAsync: uploadFile, isLoading: uploadingImage } =
    useUploadComboFile();
  const { mutateAsync, isLoading } = useMutation(createComboOffer);

  const create = async (v: ComboOffersFormValue) => {
    let data: AxiosResponse<ComboOffer> | undefined;
    try {
      data = await mutateAsync(mapComboFormValuesToRequestData(v));
      if (data?.data?.comboId) {
        if (v?.comboImage?.blob) {
          await uploadFile({
            comboId: data?.data?.comboId,
            file: v.comboImage?.blob,
          });
        }
      }
    } catch {
      //
    } finally {
      if (data?.data?.comboId) {
        routeToRestaurantRoot();
      }
    }
  };

  return { create, isLoading: isLoading || uploadingImage };
};

export default useCreateComboOffer;
