import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

export const GetPromotedOffersQueryId = "get-promoted-offers";

export type PromotedOffers = {
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
};

const getPromotedOffers = () =>
  axiosInstance.get<{
    offers: PromotedOffers[];
  }>("/promoted-content/offers");

const useGetPromotedOffers = () =>
  useQuery([GetPromotedOffersQueryId], getPromotedOffers);

export default useGetPromotedOffers;
