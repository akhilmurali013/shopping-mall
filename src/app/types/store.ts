import { FloorInfo, PhoneNumber } from "./index";

export enum StoreCatagories {
  APPAREL = "APPAREL",
  SHOES = "SHOES",
  FASHION = "FASHION",
}

type StoreTiming = {
  openingTime: string;
  closingTime: string;
};

export type Store = {
  storeId: string;
  name: string;
  description: string;
  ownerName: string;
  phoneNumbers: PhoneNumber[];
  primaryEmail: string;
  location: FloorInfo;
  categories: StoreCatagories[];
  storeSizeInSqFt: number;
  brandsAvailable: string;
  brandLogoUrl: string;
  storeImageUrl: string;

  storeTimings: StoreTiming;
  links: {
    rel: string;
    href: string;
  }[];
};
