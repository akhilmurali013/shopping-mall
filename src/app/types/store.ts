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

export type BankDetails = {
  id: string;
  storeId: string;
  accountNumber: string;
  accountName: string;
  upiId: string;
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
  website: string;
  storeTimings: StoreTiming;
  links: {
    rel: string;
    href: string;
  }[];
};
