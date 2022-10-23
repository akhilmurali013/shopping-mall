import { useMutation } from "react-query";

import axiosInstance from "axios-instance";
import RestaurantFileCategory from "restaurants/services/restaurent-file-category";

const uploadRestaurantFile = ({
  restaurantId,
  fileCategory,
  file,
}: {
  restaurantId: string;
  fileCategory: RestaurantFileCategory;
  file: File;
}) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const formData = new FormData();
  formData.append("fileCategory", fileCategory);

  formData.append("file", file);
  return axiosInstance.post<{ imageUrl: string }>(
    `/restaurants/${restaurantId}/files`,
    formData,
    config
  );
};

const useUploadRestaurantFile = () => useMutation(uploadRestaurantFile);

export default useUploadRestaurantFile;
