import { useMutation } from "react-query";

import { AxiosResponse } from "axios";

import { PhoneNumber } from "app/types";
import { CuisineStyle, DishCategory, Restaurant } from "app/types/restaurant";
import axiosInstance from "axios-instance";
import { RestaurantFormValues } from "restaurants/components/restaurant-form";
import mapRestaurantFormDataToCreateInput from "restaurants/services/map-restaurant-form-data-to-create-input";
import RestaurantFileCategory from "restaurants/services/restaurent-file-category";

import useRouteToRestaurantRoot from "./route-to-restaurant-list";
import useUploadRestaurantFile from "./upload-restaurant-image";

export type RestaurantCreateType = {
  restaurantName: string;
  ownerName: string;
  restaurantPhoneNumberPrimary?: PhoneNumber;
  restaurantPhoneNumberSecondary?: PhoneNumber;
  ownerPhoneNumberPrimary?: PhoneNumber;
  ownerPhoneNumberSecondary?: PhoneNumber;
  email: string;
  floor: string;
  cuisineStyles: CuisineStyle[];
  dishCategories: DishCategory[];
  openingTime: string;
  closingTime: string;
  bankAccount: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    upiId: string;
  };
};

const createRestaurant = (value: RestaurantCreateType) =>
  axiosInstance.post<Restaurant>("/restaurants", { ...value });

const useCreateRestaurant = () => {
  const routeToRestaurantRoot = useRouteToRestaurantRoot();
  const { mutateAsync: uploadFile, isLoading: imageUploading } =
    useUploadRestaurantFile();
  const { mutateAsync, isLoading } = useMutation(createRestaurant);

  const create = async (v: RestaurantFormValues) => {
    let data: AxiosResponse<Restaurant> | undefined;
    try {
      data = await mutateAsync(mapRestaurantFormDataToCreateInput(v));
      const restaurantId = data?.data?.restaurantId;
      if (restaurantId) {
        const promiseArray = [];
        if (v?.fssaiCertificate?.blob)
          promiseArray.push(
            uploadFile({
              restaurantId,
              fileCategory: RestaurantFileCategory.RESTAURANT_FSSAI_CERTIFICATE,
              file: v?.fssaiCertificate?.blob,
            })
          );
        if (v?.gstCertificate?.blob)
          promiseArray.push(
            uploadFile({
              restaurantId,
              fileCategory: RestaurantFileCategory.RESTAURANT_GST_CERTIFICATE,
              file: v?.gstCertificate?.blob,
            })
          );
        if (v?.menuImage?.blob)
          promiseArray.push(
            uploadFile({
              restaurantId,
              fileCategory: RestaurantFileCategory.RESAURANT_MENU_IMAGE,
              file: v?.menuImage?.blob,
            })
          );
        if (v?.panFile?.blob)
          promiseArray.push(
            uploadFile({
              restaurantId,
              fileCategory: RestaurantFileCategory.RESTAURANT_PAN,
              file: v?.panFile?.blob,
            })
          );
        if (v?.brandLogo?.blob)
          promiseArray.push(
            uploadFile({
              restaurantId,
              fileCategory: RestaurantFileCategory.RESTAURANT_LOGO,
              file: v?.brandLogo?.blob,
            })
          );
        await Promise.all(promiseArray);
      }
    } finally {
      if (data?.data?.restaurantId) {
        routeToRestaurantRoot();
      }
    }
  };

  return {
    create,
    isLoading: isLoading || imageUploading,
  };
};

export default useCreateRestaurant;
