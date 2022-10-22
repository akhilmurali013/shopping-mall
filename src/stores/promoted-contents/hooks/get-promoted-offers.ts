import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

export const GetPromotedOffersQueryId = "get-promoted-offers";

const mockPromotedOffer = (id: string, title: string) => ({
  id,
  title,
  ownerDetails: {
    ownerId: "88d899132",
    ownerType: "STORE",
    name: "Adidas",
    brandImageUrl:
      "https://s3.ap-south-1.amazonaws.com/proximety.io/profile-pictures-dev/d5b37874-6c6f-43cf-ad3c-f306cb2d360a.png",
  },
  proposedLandingPage: "DETAILS_PAGE",
  status: "PENDING_APPROVAL",
  cardContent: {
    topText: "Buy 1",
    bottomText: "Get 20% off",
  },
  color: "BLUE",
  couponCode: "XDgh123",
  startDate: "2022-05-17",
  endDate: "2022-05-17",
  termsAndConditions:
    "1. This voucher is valid until 10 days from the date of purchase.",
});

export const mockPromotedOffers = [
  mockPromotedOffer("1", "Addidas"),
  mockPromotedOffer("2", "Nike"),
  mockPromotedOffer("3", "Allen Solly"),
  mockPromotedOffer("4", "Peter England"),
  mockPromotedOffer("5", "Reebok"),
  mockPromotedOffer("6", "Puma"),
  mockPromotedOffer("7", "Paris Hilton"),
  mockPromotedOffer("8", "Chanel"),
  mockPromotedOffer("9", "Tata"),
  mockPromotedOffer("10", "Chroma"),
  mockPromotedOffer("11", "dchdsbc"),
  mockPromotedOffer("12", "cskjd cks d"),
  mockPromotedOffer("13", "sdcsdc sdcsd"),
  mockPromotedOffer("14", "sdcsdc qwqw"),
  mockPromotedOffer("15", "kajskxaj asjx"),
  mockPromotedOffer("16", "anxjnsx xnajas"),
];

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
