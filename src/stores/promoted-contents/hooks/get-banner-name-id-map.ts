import { useMemo } from "react";

import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

const GetBannersQuery = "get-banners";

type BannerListFetchType = {
  count: 10;
  total: 100;
  _embedded: {
    banners: {
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
    }[];
  };
};

const getBanners = () =>
  axiosInstance.post<BannerListFetchType>("/banners/_query", {});

const useGetBanners = () => useQuery([GetBannersQuery], () => getBanners());

const useGetBannersIdNameMap = () => {
  const { data } = useGetBanners();

  const bannerNameIdMap = useMemo(
    () =>
      // eslint-disable-next-line no-underscore-dangle
      data?.data?._embedded?.banners?.map((banner) => ({
        label: banner.title,
        value: banner.id,
      })),
    [data]
  );

  return bannerNameIdMap;
};

export default useGetBannersIdNameMap;
