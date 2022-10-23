import { Restaurant } from "app/types/restaurant";
import { RestaurantFormValues } from "restaurants/components/restaurant-form";

export default (v: Restaurant): RestaurantFormValues => ({
  restaurantName: v.restaurantName,
  ownerName: v.ownerName,
  restaurantPhoneNumber: [
    v?.restaurantPhoneNumberPrimary?.phoneNumber,
    v?.restaurantPhoneNumberSecondary?.phoneNumber,
  ].filter((i) => !!i),
  ownerPhoneNumber: [
    v?.ownerPhoneNumberPrimary?.phoneNumber,
    v?.ownerPhoneNumberSecondary?.phoneNumber,
  ].filter((i) => !!i),
  emailId: v.email,
  location: `${v.floor}`,
  cuisineStyles: v.cuisineStyles,
  dishCategories: v.dishCategories,
  brandLogo: {
    url: v.restaurantLogoUrl,
  },
  timing: {
    open: v.openingTime,
    close: v.closingTime,
  },
  bankDetails: {
    accountName: v.bankAccount.accountName,
    bankName: v.bankAccount.bankName,
    accountNumber: v.bankAccount.accountNumber,
    ifscCode: v.bankAccount.ifscCode,
    upiId: v.bankAccount.upiId,
  },
  menuImage: {
    url: v.menuImageUrl,
  },
  panFile: {
    url: v.panFileUrl,
  },
  gstCertificate: {
    url: v.gstCertificateUrl,
  },
  fssaiCertificate: {
    url: v.fssaiCertificateUrl,
  },
});
