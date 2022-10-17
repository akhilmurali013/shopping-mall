import { BankAccount } from "app/types";
import { Store } from "app/types/store";
import { StoreFormValues } from "stores/store-records/components/store-form"; // components/store-form";

export default (
  v: Store,
  bankDetails?: BankAccount
): Partial<StoreFormValues> => ({
  storeName: v.name,
  ownerName: v.ownerName ?? "",
  phoneNumbers: v.phoneNumbers?.map((phone) => phone.phoneNumber) ?? [],
  emailId: v.primaryEmail ?? "",
  website: "",
  location: (v?.location?.floorId?.toString() ?? "") as string,
  categories: v.categories ?? [],
  storeSize: v.storeSizeInSqFt,
  brandsAvailable: v.brandsAvailable,
  description: v.description,
  timing: {
    open: v?.storeTimings?.openingTime,
    close: v?.storeTimings?.closingTime,
  },
  bankDetails: {
    accountName: bankDetails?.accountName ?? "",
    accountNumber: bankDetails?.accountNumber ?? "",
    upiId: bankDetails?.upiId ?? "",
  },
  brandLogo: {
    url: v.brandLogoUrl,
  },
  storeImage: {
    url: v.storeImageUrl,
  },
});
