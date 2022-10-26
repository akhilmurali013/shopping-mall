import { ComboOffer } from "app/types/restaurant";
import { ComboOffersFormValue } from "restaurants/combo-offers//components/combo-offers-form";

export default (v: ComboOffer): ComboOffersFormValue => ({
  comboName: v.comboName,
  cost: v.price,
  comboImage: {
    url: v.comboImageUrl,
  },
  description: v.comboDescription,
  comboCategories:
    v.comboCategories?.map((category) => ({
      comboCategoryName: category?.comboCategoryName,
      items:
        category?.items?.map((item) => ({
          restaurantId: item?.restaurantId,
          dishId: item.dishId,
          dishVariantId: item?.dishVariantId,
        })) ?? [],
    })) ?? [],
});
