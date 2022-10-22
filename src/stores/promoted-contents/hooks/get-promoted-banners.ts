import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

export const GetPromotedBannersQueryId = "get-promoted-banners";

const mockPromotedBanner = (id: string, title: string) => ({
  id,
  title,
  ownerDetails: {
    ownerId: "88d899132",
    ownerType: "STORE",
  },
  proposedLandingPage: "DETAILS_PAGE",
  category: "APPARELS",
  status: "PENDING_APPROVAL",
  couponCode: "XDgh123",
  startDate: "2022-05-17",
  endDate: "2022-05-17",
  termsAndConditions:
    "1. This voucher is valid until 10 days from the date of purchase.",
  bannerImageUrl:
    "https://s3.ap-south-1.amazonaws.com/proximety.io/profile-pictures-dev/d5b37874-6c6f-43cf-ad3c-f306cb2d360a.png",
});

export const mockPromotedBanners = [
  mockPromotedBanner("1", "Addidas"),
  mockPromotedBanner("2", "Nike"),
  mockPromotedBanner("3", "Allen Solly"),
  mockPromotedBanner("4", "Peter England"),
  mockPromotedBanner("5", "Reebok"),
  mockPromotedBanner("6", "Puma"),
  mockPromotedBanner("7", "Paris Hilton"),
  mockPromotedBanner("8", "Chanel"),
  mockPromotedBanner("9", "Tata"),
  mockPromotedBanner("10", "Chroma"),
  mockPromotedBanner("11", "dchdsbc"),
  mockPromotedBanner("12", "cskjd cks d"),
  mockPromotedBanner("13", "sdcsdc sdcsd"),
  mockPromotedBanner("14", "sdcsdc qwqw"),
  mockPromotedBanner("15", "kajskxaj asjx"),
  mockPromotedBanner("16", "anxjnsx xnajas"),
];

export type PromotedBanners = {
  id: string;
  name: string;
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
