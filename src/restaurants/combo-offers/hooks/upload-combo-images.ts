import { useMutation } from "react-query";

import axiosInstance from "axios-instance";

export enum ComboFileCategory {
  COMBO_IMAGE = "COMBO_IMAGE",
}

const uploadComboImage = ({
  comboId,
  file,
  fileCategory = ComboFileCategory.COMBO_IMAGE,
}: {
  comboId: string;
  file: File;
  fileCategory?: string;
}) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const formData = new FormData();
  formData.append("file", file);
  return axiosInstance.post(
    `/combos/${comboId}/files?${fileCategory}`,
    formData,
    config
  );
};

const useUploadComboFile = () => useMutation(uploadComboImage);

export default useUploadComboFile;
