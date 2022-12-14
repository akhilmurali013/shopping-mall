import { useMutation } from "react-query";

import { Restaurant } from "app/types/restaurant";
import axiosInstance from "axios-instance";
import { RestaurantFormValues } from "restaurants/restaurant-records/components/restaurant-form";
import mapRestaurantFormDataToCreateInput from "restaurants/restaurant-records/services/map-restaurant-form-data-to-create-input";
import RestaurantFileCategory from "restaurants/restaurant-records/services/restaurent-file-category";

import { RestaurantCreateType } from "./create-restaurant";
import useUploadRestaurantFile from "./upload-restaurant-image";

const updateRestaurant = ({
  id,
  value,
}: {
  id: string;
  value: RestaurantCreateType;
}) =>
  axiosInstance.put<Restaurant>(`/restaurants/${id}`, {
    restaurantId: id,
    ...value,
  });

const useCreateRestaurant = (id: string) => {
  const { mutateAsync: uploadFile, isLoading: imageUploading } =
    useUploadRestaurantFile();
  const { mutateAsync, isLoading } = useMutation(updateRestaurant);

  const update = async (v: RestaurantFormValues) => {
    try {
      const promiseArray = [];
      promiseArray.push(
        mutateAsync({ id, value: mapRestaurantFormDataToCreateInput(v) })
      );
      if (v?.fssaiCertificate?.blob)
        promiseArray.push(
          uploadFile({
            restaurantId: id,
            fileCategory: RestaurantFileCategory.RESTAURANT_FSSAI_CERTIFICATE,
            file: v?.fssaiCertificate?.blob,
          })
        );
      if (v?.gstCertificate?.blob)
        promiseArray.push(
          uploadFile({
            restaurantId: id,
            fileCategory: RestaurantFileCategory.RESTAURANT_GST_CERTIFICATE,
            file: v?.gstCertificate?.blob,
          })
        );
      if (v?.menuImage?.blob)
        promiseArray.push(
          uploadFile({
            restaurantId: id,
            fileCategory: RestaurantFileCategory.RESAURANT_MENU_IMAGE,
            file: v?.menuImage?.blob,
          })
        );
      if (v?.panFile?.blob)
        promiseArray.push(
          uploadFile({
            restaurantId: id,
            fileCategory: RestaurantFileCategory.RESTAURANT_PAN,
            file: v?.panFile?.blob,
          })
        );
      if (v?.brandLogo?.blob)
        promiseArray.push(
          uploadFile({
            restaurantId: id,
            fileCategory: RestaurantFileCategory.RESTAURANT_LOGO,
            file: v?.brandLogo?.blob,
          })
        );
      await Promise.all(promiseArray);
    } catch {
      //
    }
  };

  return {
    update,
    isLoading: isLoading || imageUploading,
  };
};

export default useCreateRestaurant;
