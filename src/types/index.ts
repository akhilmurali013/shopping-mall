export type DishCategory = {
  dishCategoryId: number;
  categoryName: string;
  dishCategoryImageUrl: string;
};

export type DishType = {
  dishTypeId: number;
  dishTypeName: string;
};

export type CuisineStyle = {
  cuisineStyleId: number;
  cuisineStyleName: string;
};

export type CuisineType = {
  cuisineTypeId: number;
  cuisineTypeName: string;
};

export type FloorInfo = {
  floorId: number;
  floorName: string;
};

export type PhoneNumber = {
  countryCode: string;
  phoneNumber: number;
};

export type BankAccount = {
  bankAccountId: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  upiId: string;
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
  floorId: number;
  averageCostPerPerson: number;
  cuisineStyleIds: number[];
  dishCategoryIds: number[];
  openingTime: string;
  closingTime: string;
  restaurantImageUrl: string;
  restaurantLogoUrl: string;
  menuImageUrl: string;
  gstCertificateUrl: string;
  panFileUrl: string;
  fssaiCertificateUrl: string;
  rating: number;
  numberOfRatings: number;
  restaurantOpen: boolean;
  cuisineTypeId: number;
  bankAccount: BankAccount;
};
