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
  name: string;
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
