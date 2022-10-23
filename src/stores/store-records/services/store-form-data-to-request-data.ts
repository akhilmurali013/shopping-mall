import { StoreFormValues } from "stores/store-records/components/store-form";
import { CreateStoreType } from "stores/store-records/hooks/create-store";

export default (data: StoreFormValues): CreateStoreType => ({
  name: data.storeName,
  description: data.description,
  ownerName: data.ownerName,
  phoneNumbers: data.phoneNumbers.map((num) => ({
    countryCode: "+91",
    phoneNumber: num,
  })),
  primaryEmail: data.emailId,
  location: {
    floorId: data.location,
  },
  categories: data.categories,
  storeSizeInSqFt: data.storeSize,
  brandsAvailable: data.brandsAvailable,
  website: data?.website,
  storeTimings: {
    openingTime: data?.timing?.open,
    closingTime: data?.timing?.close,
  },
});
