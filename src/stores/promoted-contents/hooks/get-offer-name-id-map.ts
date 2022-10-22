import { useMemo } from "react";

import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

const GetOffersQuery = "get-offers";

type OfferListFetchType = {
  count: 10;
  total: 100;
  _embedded: {
    offers: {
      id: string;
      title: string;
      ownerDetails: {
        ownerId: string;
        ownerType: string;
        name: string;
        brandImageUrl: string;
      };
      proposedLandingPage: string;
      status: string;
      cardContent: {
        topText: string;
        bottomText: string;
      };
      color: string;
      couponCode: string;
      startDate: string;
      endDate: string;
      termsAndConditions: string;
    }[];
  };
};

const getOffers = () =>
  axiosInstance.post<OfferListFetchType>("/offers/_query", {});

const useGetOffers = () => useQuery([GetOffersQuery], () => getOffers());

const useGetOffersIdNameMap = () => {
  const { data } = useGetOffers();

  const offerNameIdMap = useMemo(
    () =>
      // eslint-disable-next-line no-underscore-dangle
      data?.data?._embedded?.offers?.map((offer) => ({
        label: offer.title,
        value: offer.id,
      })),
    [data]
  );

  return offerNameIdMap;
};

export default useGetOffersIdNameMap;
