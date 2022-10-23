import { RestaurantFormValues } from "restaurants/restaurant-records/components/restaurant-form";
import { RestaurantCreateType } from "restaurants/restaurant-records/hooks/create-restaurant";

export default (v: RestaurantFormValues): RestaurantCreateType => ({
  restaurantName: v.restaurantName,
  ownerName: v.ownerName,
  restaurantPhoneNumberPrimary: v.restaurantPhoneNumber?.[0]
    ? { countryCode: "+91", phoneNumber: v.restaurantPhoneNumber?.[0] }
    : undefined,
  restaurantPhoneNumberSecondary: v.restaurantPhoneNumber?.[1]
    ? { countryCode: "+91", phoneNumber: v.restaurantPhoneNumber?.[1] }
    : undefined,
  ownerPhoneNumberPrimary: v.ownerPhoneNumber?.[0]
    ? { countryCode: "+91", phoneNumber: v.ownerPhoneNumber?.[0] }
    : undefined,
  ownerPhoneNumberSecondary: v.ownerPhoneNumber?.[1]
    ? { countryCode: "+91", phoneNumber: v.ownerPhoneNumber?.[1] }
    : undefined,
  email: v.emailId,
  floor: v.location,
  cuisineStyles: v.cuisineStyles,
  dishCategories: v.dishCategories,
  openingTime: v.timing.open,
  closingTime: v.timing.close,
  bankAccount: {
    accountName: v.bankDetails.accountName,
    accountNumber: v.bankDetails.accountNumber,
    bankName: v.bankDetails.bankName,
    ifscCode: v.bankDetails.ifscCode,
    upiId: v.bankDetails.upiId,
  },
});
