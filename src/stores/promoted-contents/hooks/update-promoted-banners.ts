import { useMutation, useQueryClient } from "react-query";

import axiosInstance from "axios-instance";

import {
  GetPromotedBannersQueryId,
  PromotedBanners,
} from "./get-promoted-banners";

type IdListType = { id: string };

const updatePromotedBanners = (bannerIds: IdListType[]) =>
  axiosInstance.put<{
    banners: PromotedBanners[];
  }>("/promoted-content/banners", { banners: bannerIds });

const useUpdatePromotedBanners = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePromotedBanners, {
    onSuccess: () => {
      queryClient.refetchQueries(GetPromotedBannersQueryId);
    },
  });
};

export default useUpdatePromotedBanners;
