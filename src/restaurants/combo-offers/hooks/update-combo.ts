import { useMutation, useQueryClient } from "react-query";

import { ComboOffer } from "app/types/restaurant";
import axiosInstance from "axios-instance";
import { ComboOffersFormValue } from "restaurants/combo-offers/components/combo-offers-form";
import { useUploadComboFile } from "restaurants/combo-offers/hooks";
import mapComboFormValuesToRequestData from "restaurants/combo-offers/services/map-combo-form-values-to-request-data";

import { ComboCreateRequestType } from "./create-combo";
import { GetComboQueryId } from "./get-combo-offer";

const updateComboOffer = ({
  data,
  comboId,
}: {
  comboId: string;
  data: ComboCreateRequestType;
}) =>
  axiosInstance.put<ComboOffer>(`/foodcourt/combos/${comboId}`, {
    comboId,
    ...data,
  });

const useUpdateComboOffer = (comboId?: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync: uploadFile, isLoading: uploadingImage } =
    useUploadComboFile();
  const { mutateAsync, isLoading } = useMutation(updateComboOffer, {
    onSuccess: (data) => {
      queryClient.setQueryData(GetComboQueryId, data);
    },
  });

  const update = async (v: ComboOffersFormValue) => {
    if (comboId) {
      try {
        await mutateAsync({
          comboId,
          data: mapComboFormValuesToRequestData(v),
        });
        if (v?.comboImage?.blob) {
          await uploadFile({
            comboId,
            file: v.comboImage?.blob,
          });
        }
      } catch {
        //
      }
    }
  };

  return { update, isLoading: isLoading || uploadingImage };
};

export default useUpdateComboOffer;
