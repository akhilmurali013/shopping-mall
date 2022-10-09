import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { AxiosResponse } from "axios";

import { Store, StoreCatagories } from "app/types/store";
import axiosInstance from "axios-instance";
import { root } from "stores/config";
import { StoreFormValues } from "stores/store-records/components/store-form";
import routes from "stores/store-records/routes";
import storeFormDataToRequestData from "stores/store-records/services/store-form-data-to-request-data";

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

const createStore = (storeValues: CreateStoreType) =>
  axiosInstance.post<Store>(`/stores`, storeValues);

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

const useCreateStore = () => {
  const navigate = useNavigate();
  const createMutation = useMutation(createStore);
  const updateImage = useMutation(uploadStoreImages);

  const createNewStore = async (v: StoreFormValues) => {
    let storeData: AxiosResponse<Store> | undefined;

    try {
      storeData = await createMutation.mutateAsync(
        storeFormDataToRequestData(v)
      );
      if (storeData?.data?.storeId) {
        const updateBrandImage = updateImage.mutateAsync({
          storeId: storeData?.data?.storeId,
          imageCategory: ImageCategory.BRAND_IMAGE,
          file: v?.brandLogo?.blob as File,
        });

        const updateStoreImage = updateImage.mutateAsync({
          storeId: storeData?.data?.storeId,
          imageCategory: ImageCategory.STORE_IMAGE,
          file: v?.storeImage?.blob as File,
        });
        await Promise.all([updateBrandImage, updateStoreImage]);
      }
    } catch {
      // error handling
    } finally {
      if (storeData?.data?.storeId) {
        navigate(`/a/${root}/${routes.root}`);
      }
    }
  };

  return {
    createNewStore,
    isLoading: createMutation.isLoading,
  };
};

export default useCreateStore;
