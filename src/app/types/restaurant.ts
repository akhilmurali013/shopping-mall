import { BankAccount, FloorInfo, PhoneNumber } from "app/types";

export enum CuisineStyle {
  INDIAN = "INDIAN",
  CHINESE = "CHINESE",
  ARABIC = "ARABIC",
}

export enum CuisineType {
  VEG = "VEG",
  NON_VEG = "NON_VEG",
}

export enum DishCategory {
  BIRIYANI = "BIRIYANI",
  COFFE = "COFFE",
  PIZZA = "PIZZA",
}

export enum DishType {
  MAIN_COURSE = "MAIN_COURSE",
  BEVARAGE = "BEVARAGE",
  STARTER = "STARTER",
}

export type DishVariant = {
  dishVariantId: string;
  variantName: string;
  price: number;
};

export type DishVariantGroup = {
  dishVariantGroupId: string;
  variantGroupName: string;
  dishVariants: DishVariant[];
};

export type AddOn = {
  addOnId: string;
  addOnName: string;
  price: number;
  cuisineType: CuisineType;
  inStock: boolean;
};

export type AddOnGroup = {
  addOnGroupId: number;
  addOnGroupName: string;
  restaurantId: string;
  minimunValue: number;
  maximumValue: number;
  inStock: boolean;
  addOns: AddOn[];
};

export type Dish = {
  dishId: string;
  restaurantId: string;
  dishName: string;
  dishType: DishType;
  dishCategory: DishCategory;
  cuisineType: CuisineType;
  cuisineStyle: CuisineStyle;
  price: number;
  description: string;
  rating: number;
  numberOfRatings: number;
  dishImageUrl: string;
  dishVariantGroups: DishVariantGroup[];
  addOnGroups: AddOnGroup[];
  inStock: boolean;
  bestSeller: boolean;
};

export type Restaurant = {
  restaurantId: string;
  restaurantName: string;
  ownerName: string;
  priorityPhoneNumber: PhoneNumber;
  restaurantPhoneNumberPrimary: PhoneNumber;
  restaurantPhoneNumberSecondary: PhoneNumber;
  ownerPhoneNumberPrimary: PhoneNumber;
  ownerPhoneNumberSecondary: PhoneNumber;
  email: string;
  floor: FloorInfo["floorId"];
  averageCostPerPerson: number;
  cuisineStyles: CuisineStyle[];
  dishCategories: DishCategory[];
  openingTime: string;
  closingTime: string;
  bankAccount: BankAccount;
  restaurantImageUrl: string;
  restaurantLogoUrl: string;
  menuImageUrl: string;
  gstCertificateUrl: string;
  panFileUrl: string;
  fssaiCertificateUrl: string;
  rating: number;
  numberOfRatings: number;
  restaurantOpen: boolean;
  dishes: Dish[];
};
