import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

export const GetPromotedBannersQueryId = "get-promoted-banners";

export type PromotedBanners = {
  id: string;
  title: string;
  ownerDetails: {
    ownerId: string;
    ownerType: string;
  };
  proposedLandingPage: string;
  category: string;
  status: string;
  couponCode: string;
  startDate: string;
  endDate: string;
  termsAndConditions: string;
  bannerImageUrl: string;
};

const getPromotedBanners = () =>
  axiosInstance.get<{
    banners: PromotedBanners[];
  }>("/promoted-content/banners");

const useGetPromotedBanners = () =>
  useQuery([GetPromotedBannersQueryId], getPromotedBanners);

export default useGetPromotedBanners;
