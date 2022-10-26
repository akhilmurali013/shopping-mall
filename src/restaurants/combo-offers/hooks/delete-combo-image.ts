import { useMutation } from "react-query";

import axiosInstance from "axios-instance";

import { ComboFileCategory } from "./upload-combo-images";

const deleteFile = (
  comboId: string,
  fileCategory = ComboFileCategory.COMBO_IMAGE
) =>
  axiosInstance.delete(`/combos/${comboId}/files?fileCategory=${fileCategory}`);

const useDeleteComboImage = () => useMutation(deleteFile);

export default useDeleteComboImage;
