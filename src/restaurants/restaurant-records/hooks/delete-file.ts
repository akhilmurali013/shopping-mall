import { useMutation } from "react-query";

import axiosInstance from "axios-instance";
import RestaurantFileCategory from "restaurants/restaurant-records/services/restaurent-file-category";

const deleteFile = (
  restaurantId: string,
  fileCategory: RestaurantFileCategory
) =>
  axiosInstance.delete(
    `/restaurants/${restaurantId}/files?fileCategory=${fileCategory}`
  );

const useDeleteFile = () =>
  useMutation(
    ({
      restaurantId,
      fileCategory,
    }: {
      restaurantId: string;
      fileCategory: RestaurantFileCategory;
    }) => deleteFile(restaurantId, fileCategory)
  );

export default useDeleteFile;
