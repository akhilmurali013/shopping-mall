import { ComboOffersFormValue } from "restaurants/combo-offers//components/combo-offers-form";
import { ComboCreateRequestType } from "restaurants/combo-offers/hooks/create-combo";

export default (v: ComboOffersFormValue): ComboCreateRequestType => ({
  comboName: v.comboName,
  comboDescription: v.description,
  price: v.cost,
  bestSeller: false,
  comboCategories: v.comboCategories?.map((combo) => ({
    comboCategoryName: combo?.comboCategoryName ?? "",
    items: combo?.items?.map((item) => ({
      restaurantId: item.restaurantId,
      dishId: item.dishId,
      dishVariantId: item.dishVariantId,
    })),
  })),
});
