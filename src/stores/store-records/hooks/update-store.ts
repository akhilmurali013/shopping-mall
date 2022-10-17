import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { Store, StoreCatagories } from "app/types/store";
import axiosInstance from "axios-instance";
import { root } from "stores/config";
import { StoreFormValues } from "stores/store-records/components/store-form";
import routes from "stores/store-records/routes";
import storeFormDataToRequestData from "stores/store-records/services/store-form-data-to-request-data";

import useUpdateBankDetails from "./update-bank-details";

export type CreateStoreType = {
  name: string;
  description: string;
  ownerName: string;
  primaryEmail: string;
  phoneNumbers: {
    countryCode: string;
    phoneNumber: number;
  }[];
  location: {
    floorId: string;
  };
  categories: StoreCatagories[];
  storeSizeInSqFt: number;
  brandsAvailable: string;
  storeTimings: {
    openingTime: string;
    closingTime: string;
  };
};

enum ImageCategory {
  BRAND_IMAGE = "BRAND_IMAGE",
  STORE_IMAGE = "STORE_IMAGE",
}

const updateStore = ({
  storeId,
  storeValues,
}: {
  storeId: string;
  storeValues: CreateStoreType;
}) => axiosInstance.put<Store>(`/stores/${storeId}`, storeValues);

const uploadStoreImages = ({
  storeId,
  imageCategory,
  file,
}: {
  storeId: Store["storeId"];
  imageCategory: ImageCategory;
  file: File;
}) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const formData = new FormData();
  formData.append("imageCategory", imageCategory);

  formData.append("image", file);
  return axiosInstance.post<{ imageUrl: string }>(
    `/stores/${storeId}/images`,
    formData,
    config
  );
};

const useUpdateStore = (storeId?: string) => {
  const navigate = useNavigate();
  const { mutateAsync: updateBankDetails, isLoading: accountDetailsUpdating } =
    useUpdateBankDetails();
  const updateMutation = useMutation(updateStore);
  const updateImage = useMutation(uploadStoreImages);

  const update = async (v: StoreFormValues) => {
    if (storeId) {
      const updatedData = await updateMutation.mutateAsync({
        storeId,
        storeValues: storeFormDataToRequestData(v),
      });
      try {
        await updateBankDetails({
          storeId,
          accountNumber: v?.bankDetails?.accountNumber,
          accountName: v?.bankDetails?.accountName,
          upiId: v?.bankDetails?.upiId,
        });
        if (v?.brandLogo?.blob) {
          await updateImage.mutateAsync({
            storeId,
            imageCategory: ImageCategory.BRAND_IMAGE,
            file: v?.brandLogo?.blob,
          });
          if (v?.storeImage?.blob)
            await updateImage.mutateAsync({
              storeId,
              imageCategory: ImageCategory.STORE_IMAGE,
              file: v?.storeImage?.blob,
            });
        }
      } finally {
        if (updatedData?.data?.storeId) {
          navigate(`/a/${root}/${routes.root}/${storeId}/${routes.details}`);
        }
      }
    }
  };

  return {
    update,
    isLoading:
      updateMutation.isLoading ||
      updateImage.isLoading ||
      accountDetailsUpdating,
  };
};

export default useUpdateStore;
